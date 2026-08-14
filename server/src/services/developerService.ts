import { driver } from "../config/database";

export interface Developer {
    id: string;
    name: string;
    title: string;
}

export interface DeveloperDetails extends Developer {
    skills: string[];
    projects: {
        id: string;
        name: string;
        description: string;
        technologies: string[];
    }[];
}

export interface GraphStats {
    developers: number;
    skills: number;
    projects: number;
    technologies: number;
}

export const getDevelopers = async (): Promise<Developer[]> => {
    const result = await driver.executeQuery(`
    MATCH (d:Developer)
    RETURN
      d.id AS id,
      d.name AS name,
      d.title AS title
    ORDER BY d.name
  `);

    return result.records.map((record) => ({
        id: record.get("id"),
        name: record.get("name"),
        title: record.get("title"),
    }));
};

export const getDeveloperById = async (
    developerId: string
): Promise<DeveloperDetails | null> => {
    const result = await driver.executeQuery(
        `
    MATCH (d:Developer {id: $developerId})

    OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)

    OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)

    OPTIONAL MATCH (p)-[:USES]->(t:Technology)

    RETURN
      d.id AS id,
      d.name AS name,
      d.title AS title,
      collect(DISTINCT s.name) AS skills,
      collect(
        DISTINCT {
          id: p.id,
          name: p.name,
          description: p.description,
          technologies: t.name
        }
      ) AS projectData
    `,
        {
            developerId,
        }
    );

    if (result.records.length === 0) {
        return null;
    }

    const record = result.records[0];

    const rawProjects = record.get("projectData");

    const projectsMap = new Map<
        string,
        {
            id: string;
            name: string;
            description: string;
            technologies: string[];
        }
    >();

    for (const project of rawProjects) {
        if (!project.id) {
            continue;
        }

        if (!projectsMap.has(project.id)) {
            projectsMap.set(project.id, {
                id: project.id,
                name: project.name,
                description: project.description,
                technologies: [],
            });
        }

        if (
            project.technologies &&
            !projectsMap.get(project.id)?.technologies.includes(project.technologies)
        ) {
            projectsMap.get(project.id)?.technologies.push(project.technologies);
        }
    }

    return {
        id: record.get("id"),
        name: record.get("name"),
        title: record.get("title"),
        skills: record.get("skills"),
        projects: Array.from(projectsMap.values()),
    };
};

interface SearchDeveloperFilters {
    skill?: string;
    technology?: string;
}

export const searchDevelopers = async ({
    skill,
    technology,
}: SearchDeveloperFilters): Promise<Developer[]> => {
    const conditions: string[] = [];
    const params: Record<string, string> = {};

    if (skill) {
        conditions.push("toLower(s.name) = toLower($skill)");
        params.skill = skill;
    }

    if (technology) {
        conditions.push("toLower(t.name) = toLower($technology)");
        params.technology = technology;
    }

    const whereClause =
        conditions.length > 0
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    const result = await driver.executeQuery(
        `
        MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill),
              (d)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)

        ${whereClause}

        RETURN DISTINCT
          d.id AS id,
          d.name AS name,
          d.title AS title

        ORDER BY d.name
        `,
        params
    );

    return result.records.map((record) => ({
        id: record.get("id"),
        name: record.get("name"),
        title: record.get("title"),
    }));
};

export const getGraphStats = async (): Promise<GraphStats> => {
    const result = await driver.executeQuery(`
      MATCH (d:Developer)
      WITH count(d) AS developers
  
      OPTIONAL MATCH (s:Skill)
      WITH developers, count(s) AS skills
  
      OPTIONAL MATCH (p:Project)
      WITH developers, skills, count(p) AS projects
  
      OPTIONAL MATCH (t:Technology)
  
      RETURN
        developers,
        skills,
        projects,
        count(t) AS technologies
    `);

    const record = result.records[0];

    return {
        developers: record.get("developers").toNumber(),
        skills: record.get("skills").toNumber(),
        projects: record.get("projects").toNumber(),
        technologies: record.get("technologies").toNumber(),
    };
};