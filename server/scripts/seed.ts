import dotenv from "dotenv";
import neo4j from "neo4j-driver";

dotenv.config();

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

if (!uri || !username || !password) {
  throw new Error("CognoDB environment variables are missing");
}

const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);

const seedDatabase = async (): Promise<void> => {
  const session = driver.session();

  try {
    console.log("Starting database seed...");

    await session.run(`
      CREATE CONSTRAINT developer_id_unique IF NOT EXISTS
      FOR (d:Developer)
      REQUIRE d.id IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
      FOR (s:Skill)
      REQUIRE s.id IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT project_id_unique IF NOT EXISTS
      FOR (p:Project)
      REQUIRE p.id IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT technology_id_unique IF NOT EXISTS
      FOR (t:Technology)
      REQUIRE t.id IS UNIQUE
    `);

    console.log("Constraints created.");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Existing graph data cleared.");

    await session.run(
      `
      UNWIND $developers AS developer
      CREATE (d:Developer {
        id: developer.id,
        name: developer.name,
        title: developer.title
      })
      `,
      {
        developers: [
          {
            id: "dev-001",
            name: "Amit Sharma",
            title: "Senior Frontend Developer",
          },
          {
            id: "dev-002",
            name: "Priya Shah",
            title: "Full Stack Developer",
          },
          {
            id: "dev-003",
            name: "Rahul Mehta",
            title: "Backend Developer",
          },
          {
            id: "dev-004",
            name: "Neha Patel",
            title: "Frontend Developer",
          },
          {
            id: "dev-005",
            name: "Vivek Joshi",
            title: "Software Engineer",
          },
          {
            id: "dev-006",
            name: "Anjali Desai",
            title: "React Developer",
          },
          {
            id: "dev-007",
            name: "Karan Shah",
            title: "Full Stack Engineer",
          },
          {
            id: "dev-008",
            name: "Riya Mehta",
            title: "Frontend Engineer",
          },
        ],
      }
    );

    await session.run(
      `
      UNWIND $skills AS skill
      CREATE (s:Skill {
        id: skill.id,
        name: skill.name
      })
      `,
      {
        skills: [
          { id: "skill-001", name: "React" },
          { id: "skill-002", name: "TypeScript" },
          { id: "skill-003", name: "JavaScript" },
          { id: "skill-004", name: "Node.js" },
          { id: "skill-005", name: "MongoDB" },
          { id: "skill-006", name: "AWS" },
          { id: "skill-007", name: "Next.js" },
          { id: "skill-008", name: "Express" },
        ],
      }
    );

    await session.run(
      `
      UNWIND $projects AS project
      CREATE (p:Project {
        id: project.id,
        name: project.name,
        description: project.description
      })
      `,
      {
        projects: [
          {
            id: "project-001",
            name: "FoodHub",
            description: "B2B food ordering platform",
          },
          {
            id: "project-002",
            name: "ShopSphere",
            description: "E-commerce platform",
          },
          {
            id: "project-003",
            name: "TravelMate",
            description: "Travel planning application",
          },
          {
            id: "project-004",
            name: "FinTrack",
            description: "Personal finance management platform",
          },
          {
            id: "project-005",
            name: "HealthConnect",
            description: "Healthcare appointment platform",
          },
          {
            id: "project-006",
            name: "EduPortal",
            description: "Online learning platform",
          },
        ],
      }
    );

    await session.run(
      `
      UNWIND $technologies AS technology
      CREATE (t:Technology {
        id: technology.id,
        name: technology.name
      })
      `,
      {
        technologies: [
          { id: "tech-001", name: "React" },
          { id: "tech-002", name: "Node.js" },
          { id: "tech-003", name: "TypeScript" },
          { id: "tech-004", name: "MongoDB" },
          { id: "tech-005", name: "PostgreSQL" },
          { id: "tech-006", name: "AWS" },
          { id: "tech-007", name: "Next.js" },
          { id: "tech-008", name: "Express" },
        ],
      }
    );

    await session.run(`
      MATCH
        (d1:Developer {id: "dev-001"}),
        (d2:Developer {id: "dev-002"}),
        (d3:Developer {id: "dev-003"}),
        (d4:Developer {id: "dev-004"}),
        (d5:Developer {id: "dev-005"}),
        (d6:Developer {id: "dev-006"}),
        (d7:Developer {id: "dev-007"}),
        (d8:Developer {id: "dev-008"}),

        (s1:Skill {id: "skill-001"}),
        (s2:Skill {id: "skill-002"}),
        (s3:Skill {id: "skill-003"}),
        (s4:Skill {id: "skill-004"}),
        (s5:Skill {id: "skill-005"}),
        (s6:Skill {id: "skill-006"}),
        (s7:Skill {id: "skill-007"}),
        (s8:Skill {id: "skill-008"}),

        (p1:Project {id: "project-001"}),
        (p2:Project {id: "project-002"}),
        (p3:Project {id: "project-003"}),
        (p4:Project {id: "project-004"}),
        (p5:Project {id: "project-005"}),
        (p6:Project {id: "project-006"})

      CREATE
        (d1)-[:HAS_SKILL]->(s1),
        (d1)-[:HAS_SKILL]->(s2),
        (d1)-[:HAS_SKILL]->(s3),

        (d2)-[:HAS_SKILL]->(s1),
        (d2)-[:HAS_SKILL]->(s2),
        (d2)-[:HAS_SKILL]->(s4),
        (d2)-[:HAS_SKILL]->(s5),

        (d3)-[:HAS_SKILL]->(s4),
        (d3)-[:HAS_SKILL]->(s5),
        (d3)-[:HAS_SKILL]->(s8),

        (d4)-[:HAS_SKILL]->(s1),
        (d4)-[:HAS_SKILL]->(s3),
        (d4)-[:HAS_SKILL]->(s7),

        (d5)-[:HAS_SKILL]->(s2),
        (d5)-[:HAS_SKILL]->(s4),
        (d5)-[:HAS_SKILL]->(s6),

        (d6)-[:HAS_SKILL]->(s1),
        (d6)-[:HAS_SKILL]->(s2),
        (d6)-[:HAS_SKILL]->(s7),

        (d7)-[:HAS_SKILL]->(s1),
        (d7)-[:HAS_SKILL]->(s4),
        (d7)-[:HAS_SKILL]->(s5),
        (d7)-[:HAS_SKILL]->(s6),

        (d8)-[:HAS_SKILL]->(s1),
        (d8)-[:HAS_SKILL]->(s3),

        (d1)-[:WORKED_ON]->(p1),
        (d1)-[:WORKED_ON]->(p2),

        (d2)-[:WORKED_ON]->(p1),
        (d2)-[:WORKED_ON]->(p4),

        (d3)-[:WORKED_ON]->(p4),
        (d3)-[:WORKED_ON]->(p6),

        (d4)-[:WORKED_ON]->(p2),
        (d4)-[:WORKED_ON]->(p3),

        (d5)-[:WORKED_ON]->(p5),
        (d5)-[:WORKED_ON]->(p6),

        (d6)-[:WORKED_ON]->(p2),
        (d6)-[:WORKED_ON]->(p3),

        (d7)-[:WORKED_ON]->(p1),
        (d7)-[:WORKED_ON]->(p5),

        (d8)-[:WORKED_ON]->(p2),
        (d8)-[:WORKED_ON]->(p6)
    `);

    await session.run(`
      MATCH
        (p1:Project {id: "project-001"}),
        (p2:Project {id: "project-002"}),
        (p3:Project {id: "project-003"}),
        (p4:Project {id: "project-004"}),
        (p5:Project {id: "project-005"}),
        (p6:Project {id: "project-006"}),

        (t1:Technology {id: "tech-001"}),
        (t2:Technology {id: "tech-002"}),
        (t3:Technology {id: "tech-003"}),
        (t4:Technology {id: "tech-004"}),
        (t5:Technology {id: "tech-005"}),
        (t6:Technology {id: "tech-006"}),
        (t7:Technology {id: "tech-007"}),
        (t8:Technology {id: "tech-008"})

      CREATE
        (p1)-[:USES]->(t1),
        (p1)-[:USES]->(t2),
        (p1)-[:USES]->(t3),
        (p1)-[:USES]->(t4),

        (p2)-[:USES]->(t1),
        (p2)-[:USES]->(t3),
        (p2)-[:USES]->(t7),

        (p3)-[:USES]->(t1),
        (p3)-[:USES]->(t2),
        (p3)-[:USES]->(t5),

        (p4)-[:USES]->(t2),
        (p4)-[:USES]->(t4),
        (p4)-[:USES]->(t5),

        (p5)-[:USES]->(t1),
        (p5)-[:USES]->(t2),
        (p5)-[:USES]->(t6),

        (p6)-[:USES]->(t1),
        (p6)-[:USES]->(t3),
        (p6)-[:USES]->(t6)
    `);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
};

seedDatabase();