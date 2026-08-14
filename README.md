# GraphQuest

GraphQuest is a small graph-powered developer exploration application built for the Wexa AI take-home assignment.

It allows users to explore relationships between developers, skills, projects and technologies.

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Node.js
- Express
- CognoDB
- Neo4j JavaScript Driver
- Tailwind CSS

## Why a graph database?

The interesting part of this application is not simply storing developers and their skills.

The useful questions involve relationships across multiple entities.

For example:

> Find developers who have React as a skill and have worked on projects that use Node.js.

This requires traversing:

Developer → Skill

and:

Developer → Project → Technology

A relational database could model this using multiple tables and join tables, but graph traversal expresses the relationship directly and becomes easier to extend when more relationship types are introduced.

The graph model also allows multi-hop questions to be expressed naturally using Cypher.

## Data Model

```mermaid
graph LR

    Developer -->|HAS_SKILL| Skill
    Developer -->|WORKED_ON| Project
    Project -->|USES| Technology