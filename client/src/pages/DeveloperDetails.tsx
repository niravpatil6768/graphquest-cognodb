import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import GraphPath from "../components/GraphPath";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { fetchDeveloperById } from "../features/developers/developerSlice";

import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import InteractiveGraph from "../components/InteractiveGraph";

export default function DeveloperDetails() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { selectedDeveloper, loading, error } = useAppSelector(
    (state) => state.developers,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDeveloperById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <LoadingState />
        </div>
      </main>
    );
  }

  if (error || !selectedDeveloper) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link
            to="/"
            className="mb-6 inline-block text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            ← Back to Explore
          </Link>

          <EmptyState
            message={error || "Developer information is unavailable."}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/"
          className="mb-8 inline-block text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          ← Back to Explore
        </Link>

        {/* Profile */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 text-lg font-semibold text-white">
              {selectedDeveloper.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
                {selectedDeveloper.name}
              </h1>

              <p className="mt-1 text-zinc-500">{selectedDeveloper.title}</p>

              <p className="mt-2 text-xs text-zinc-400">
                Developer ID: {selectedDeveloper.id}
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-7">
          <h2 className="text-lg font-semibold text-zinc-900">Skills</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedDeveloper.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <InteractiveGraph
          developerName={selectedDeveloper.name}
          skills={selectedDeveloper.skills}
          projects={selectedDeveloper.projects}
        />

        {/* Projects */}
        <section className="mt-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Projects</h2>

          <div className="grid gap-5 md:grid-cols-2">
            {selectedDeveloper.projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <h3 className="font-semibold text-zinc-900">{project.name}</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-16 border-t border-zinc-200 py-8 text-center">
        <p className="text-xs text-zinc-400">
          GraphQuest · Built with React, Node.js & CognoDB
        </p>
      </footer>
    </main>
  );
}
