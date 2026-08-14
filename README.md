# GraphQuest — Developer Search

GraphQuest is a full-stack developer search application built with **React, TypeScript, Node.js, Express, and CognoDB**.

The application allows users to search developers based on their **skills**, **technologies**, or both. It uses a graph database to represent the relationships between developers, projects, skills, and technologies.

---

## Use Case

The application helps recruiters or engineering teams find developers based on their experience.

For example:

* Find developers with a `Frontend` skill.
* Find developers who have worked with `React`.
* Find developers who have both a `Frontend` skill and React project experience.

---

## Why a Graph Database?

The data in this application is highly relationship-oriented.

A developer can have multiple skills and work on multiple projects, while each project can use multiple technologies.

With CognoDB, these relationships can be represented naturally:

```text
Developer ──HAS_SKILL──> Skill

Developer ──WORKED_ON──> Project ──USES──> Technology
```

This makes relationship-based searches simpler and provides a good foundation for future features such as developer recommendations, similar developers, and project matching.

---

## Data Model

```text
              ┌─────────┐
              │  Skill  │
              └────▲────┘
                   │
               HAS_SKILL
                   │
             ┌─────┴─────┐
             │ Developer │
             └─────┬─────┘
                   │
               WORKED_ON
                   │
             ┌─────▼─────┐
             │  Project  │
             └─────┬─────┘
                   │
                  USES
                   │
             ┌─────▼──────┐
             │ Technology │
             └────────────┘
```

---

## Tech Stack

**Frontend**

* React
* TypeScript
* Redux Toolkit
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express
* TypeScript
* Neo4j JavaScript Driver

**Database**

* CognoDB
* openCypher
* Bolt Protocol

---

## Setup & Run

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd graphquest
```

### 2. Create CognoDB Instance

Create a CognoDB graph database instance and obtain the Bolt connection credentials:

```text
COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD
```

### 3. Configure Backend

Create `server/.env`:

```env
COGNODB_URI=your_cognodb_uri
COGNODB_USERNAME=your_username
COGNODB_PASSWORD=your_password
```

Then:

```bash
cd server
npm install
npm run dev
```

### 4. Configure Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will connect to the backend API.

---

## Main API

### Search by skill

```http
GET /api/developers/search?skill=Frontend
```

### Search by technology

```http
GET /api/developers/search?technology=React
```

### Search by both

```http
GET /api/developers/search?skill=Frontend&technology=React
```

At least one filter is required.

---

## Main Graph Query

The application searches through the graph using the relationships between developers, skills, projects, and technologies.

Example:

```cypher
MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill),
      (d)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)

WHERE toLower(s.name) = toLower($skill)
  AND toLower(t.name) = toLower($technology)

RETURN DISTINCT
  d.id AS id,
  d.name AS name,
  d.title AS title

ORDER BY d.name
```

The backend dynamically adjusts the `WHERE` conditions when only a skill or only a technology is provided.

---

## UI Screenshots

### Developer Search

![Developer Search](docs/screenshots/developer-search.png)

### Search Results

![Search Results](docs/screenshots/search-results.png)

### Graph View

![Graph View](docs/screenshots/graph-view.png)

---

## Project Structure

```text
graphquest/
├── client/       # React frontend
├── server/       # Express backend
├── docs/
│   └── screenshots/
└── README.md
```

---

## Future Improvements

* Developer recommendation based on graph relationships
* Similar developer discovery
* Project-to-developer matching
* Advanced graph visualization
* Authentication and authorization

<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/9e34e019-bd56-434f-8c91-702767cb3a6d" />
<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/7663b61d-b864-4851-a868-7894954d18ef" />
<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/ef59df85-7bfe-48c3-b59b-61a68c6ea91d" />



---

## Author

**Nirav Patil**

React.js / Full Stack Developer
