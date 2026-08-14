import { useState } from "react";

interface Project {
  id: string;
  name: string;
  description?: string;
  technologies: string[];
}

interface InteractiveGraphProps {
  developerName: string;
  skills: string[];
  projects: Project[];
}

type NodeType = "developer" | "skill" | "project" | "technology";

interface SelectedNode {
  type: NodeType;
  label: string;
}

export default function InteractiveGraph({
  developerName,
  skills,
  projects,
}: InteractiveGraphProps) {
  const [selectedNode, setSelectedNode] = useState<SelectedNode>({
    type: "developer",
    label: developerName,
  });

  const project = projects[0];

  const technologies = Array.from(
    new Set(projects.flatMap((currentProject) => currentProject.technologies)),
  );

  const primarySkill = skills[0];
  const secondarySkill = skills[1];

  const primaryTechnology = technologies[0];
  const secondaryTechnology = technologies[1];

  const handleSelect = (type: NodeType, label: string) => {
    setSelectedNode({
      type,
      label,
    });
  };

  const isSelected = (type: NodeType, label: string) => {
    return selectedNode.type === type && selectedNode.label === label;
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-zinc-200 px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white">
                G
              </div>

              <h2 className="text-lg font-semibold text-zinc-950">
                Relationship graph
              </h2>
            </div>

            <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-500">
              Explore how this developer connects to skills, projects and
              technologies.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-zinc-500">
              Interactive
            </span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* DESKTOP / TABLET GRAPH */}
      {/* ================================================== */}

      <div className="hidden bg-zinc-50 md:block">
        <div className="relative mx-auto h-[500px] max-w-6xl overflow-hidden">
          {/* Background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#d4d4d8 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* CONNECTIONS */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            {/* Developer → Project */}
            {project && (
              <line
                x1="280"
                y1="260"
                x2="460"
                y2="260"
                stroke="#a1a1aa"
                strokeWidth="2"
              />
            )}

            {/* Project → Technology */}
            {primaryTechnology && (
              <line
                x1="540"
                y1="260"
                x2="720"
                y2="180"
                stroke="#a1a1aa"
                strokeWidth="2"
              />
            )}

            {secondaryTechnology && (
              <line
                x1="540"
                y1="260"
                x2="720"
                y2="340"
                stroke="#d4d4d8"
                strokeWidth="2"
              />
            )}

            {/* Developer → Skill */}
            {primarySkill && (
              <line
                x1="230"
                y1="215"
                x2="175"
                y2="110"
                stroke="#d4d4d8"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            )}

            {secondarySkill && (
              <line
                x1="230"
                y1="305"
                x2="175"
                y2="410"
                stroke="#d4d4d8"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            )}

            {/* Arrow: Developer → Project */}
            {project && (
              <polygon points="455,254 467,260 455,266" fill="#71717a" />
            )}

            {/* Arrow: Project → Technology */}
            {primaryTechnology && (
              <polygon points="714,176 726,180 714,186" fill="#71717a" />
            )}

            {secondaryTechnology && (
              <polygon points="714,336 726,340 714,346" fill="#d4d4d8" />
            )}
          </svg>

          {/* RELATIONSHIP LABELS */}

          {project && (
            <div className="absolute left-[35%] top-[calc(50%-28px)] rounded-md bg-zinc-50 px-2 py-1 text-[9px] font-semibold tracking-wide text-zinc-400">
              WORKED_ON
            </div>
          )}

          {primaryTechnology && (
            <div className="absolute left-[66%] top-[31%] rounded-md bg-zinc-50 px-2 py-1 text-[9px] font-semibold tracking-wide text-zinc-400">
              USES
            </div>
          )}

          {primarySkill && (
            <div className="absolute left-[13%] top-[27%] rounded-md bg-zinc-50 px-2 py-1 text-[9px] font-semibold tracking-wide text-zinc-400">
              HAS_SKILL
            </div>
          )}

          {/* SKILL 1 */}
          {primarySkill && (
            <button
              type="button"
              onClick={() => handleSelect("skill", primarySkill)}
              className={`absolute left-[7%] top-[12%] w-[150px] rounded-xl border bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected("skill", primarySkill)
                  ? "border-zinc-950 ring-4 ring-zinc-100"
                  : "border-zinc-200"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Skill
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
                {primarySkill}
              </p>
            </button>
          )}

          {/* SKILL 2 */}
          {secondarySkill && (
            <button
              type="button"
              onClick={() => handleSelect("skill", secondarySkill)}
              className={`absolute bottom-[10%] left-[7%] w-[150px] rounded-xl border bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected("skill", secondarySkill)
                  ? "border-zinc-950 ring-4 ring-zinc-100"
                  : "border-zinc-200"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Skill
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
                {secondarySkill}
              </p>
            </button>
          )}

          {/* DEVELOPER */}
          <button
            type="button"
            onClick={() => handleSelect("developer", developerName)}
            className={`absolute left-[18%] top-1/2 w-[150px] -translate-y-1/2 rounded-2xl border bg-white p-5 text-center shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-xl ${
              isSelected("developer", developerName)
                ? "border-zinc-950 ring-4 ring-zinc-100"
                : "border-zinc-200"
            }`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
              {developerName
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Developer
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
              {developerName}
            </p>
          </button>

          {/* PROJECT */}
          {project && (
            <button
              type="button"
              onClick={() => handleSelect("project", project.name)}
              className={`absolute left-[46%] top-1/2 w-[150px] -translate-y-1/2 rounded-2xl border bg-white p-5 text-center shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-xl ${
                isSelected("project", project.name)
                  ? "border-zinc-950 ring-4 ring-zinc-100"
                  : "border-zinc-200"
              }`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-sm font-bold text-zinc-700">
                P
              </div>

              <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Project
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
                {project.name}
              </p>
            </button>
          )}

          {/* TECHNOLOGY 1 */}
          {primaryTechnology && (
            <button
              type="button"
              onClick={() => handleSelect("technology", primaryTechnology)}
              className={`absolute right-[7%] top-[20%] w-[150px] rounded-xl border bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected("technology", primaryTechnology)
                  ? "border-zinc-950 ring-4 ring-zinc-100"
                  : "border-zinc-200"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Technology
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
                {primaryTechnology}
              </p>
            </button>
          )}

          {/* TECHNOLOGY 2 */}
          {secondaryTechnology && (
            <button
              type="button"
              onClick={() => handleSelect("technology", secondaryTechnology)}
              className={`absolute right-[7%] bottom-[20%] w-[150px] rounded-xl border bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected("technology", secondaryTechnology)
                  ? "border-zinc-950 ring-4 ring-zinc-100"
                  : "border-zinc-200"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Technology
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
                {secondaryTechnology}
              </p>
            </button>
          )}

          {/* Hint */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-400 shadow-sm">
            Click a node to explore
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* MOBILE GRAPH */}
      {/* ================================================== */}

      <div className="bg-zinc-50 px-4 py-8 md:hidden">
        <div className="mx-auto max-w-md">
          {/* Developer */}
          <MobileNode
            type="Developer"
            label={developerName}
            selected={isSelected("developer", developerName)}
            onClick={() => handleSelect("developer", developerName)}
            primary
          />

          <MobileRelationship label="WORKED_ON" />

          {/* Project */}
          {project && (
            <>
              <MobileNode
                type="Project"
                label={project.name}
                selected={isSelected("project", project.name)}
                onClick={() => handleSelect("project", project.name)}
              />

              <MobileRelationship label="USES" />

              {/* Technologies */}
              <div className="grid grid-cols-1 gap-3">
                {technologies.slice(0, 2).map((technology) => (
                  <MobileNode
                    key={technology}
                    type="Technology"
                    label={technology}
                    selected={isSelected("technology", technology)}
                    onClick={() => handleSelect("technology", technology)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <>
              <div className="my-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-200" />

                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Skills
                </span>

                <div className="h-px flex-1 bg-zinc-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skills.slice(0, 4).map((skill) => (
                  <MobileNode
                    key={skill}
                    type="Skill"
                    label={skill}
                    selected={isSelected("skill", skill)}
                    onClick={() => handleSelect("skill", skill)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================================================== */}
      {/* SELECTED NODE */}
      {/* ================================================== */}

      <div className="border-t border-zinc-200 bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Selected node
              </span>

              <span className="rounded-md bg-zinc-100 px-2 py-1 text-[10px] font-semibold uppercase text-zinc-500">
                {selectedNode.type}
              </span>
            </div>

            <p className="mt-1 text-base font-semibold text-zinc-950 sm:text-lg">
              {selectedNode.label}
            </p>
          </div>

          <p className="max-w-lg text-sm leading-6 text-zinc-500">
            {selectedNode.type === "developer" &&
              "Connected to projects through WORKED_ON and to skills through HAS_SKILL."}

            {selectedNode.type === "skill" &&
              `Connected to ${developerName} through HAS_SKILL.`}

            {selectedNode.type === "project" &&
              `Connected to ${developerName} through WORKED_ON and to technologies through USES.`}

            {selectedNode.type === "technology" &&
              "Connected to the project through the USES relationship."}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ====================================================== */
/* MOBILE NODE */
/* ====================================================== */

interface MobileNodeProps {
  type: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  primary?: boolean;
}

function MobileNode({
  type,
  label,
  selected,
  onClick,
  primary = false,
}: MobileNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all duration-200 active:scale-[0.98] ${
        selected
          ? "border-zinc-950 bg-zinc-950 text-white shadow-lg ring-4 ring-zinc-100"
          : "border-zinc-200 hover:border-zinc-400 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
            selected
              ? "bg-white text-zinc-950"
              : primary
                ? "bg-zinc-950 text-white"
                : "bg-zinc-100 text-zinc-700"
          }`}
        >
          {type.charAt(0)}
        </div>

        <div className="min-w-0">
          <p
            className={`text-[10px] font-semibold uppercase tracking-wider ${
              selected ? "text-zinc-400" : "text-zinc-400"
            }`}
          >
            {type}
          </p>

          <p
            className={`truncate text-sm font-semibold ${
              selected ? "text-white" : "text-zinc-950"
            }`}
          >
            {label}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ====================================================== */
/* MOBILE RELATIONSHIP */
/* ====================================================== */

function MobileRelationship({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-3">
      <div className="h-7 w-px bg-zinc-300" />

      <span className="my-1 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[9px] font-semibold tracking-wider text-zinc-400 shadow-sm">
        {label}
      </span>

      <div className="relative h-7 w-px bg-zinc-300">
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-zinc-400">
          ↓
        </span>
      </div>
    </div>
  );
}
