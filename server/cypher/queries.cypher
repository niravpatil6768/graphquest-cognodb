// 1. Get all developers

MATCH (d:Developer)
RETURN
  d.id AS id,
  d.name AS name,
  d.title AS title
ORDER BY d.name;


// 2. Get a developer with skills and projects

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
  ) AS projectData;


// 3. Multi-hop developer discovery

MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill),
      (d)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)

WHERE toLower(s.name) = toLower($skill)
  AND toLower(t.name) = toLower($technology)

RETURN DISTINCT
  d.id AS id,
  d.name AS name,
  d.title AS title

ORDER BY d.name;


// 4. Explore a graph path

MATCH path =
  (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)

WHERE d.id = $developerId

RETURN path;