import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  fetchDevelopers,
  fetchGraphStats,
  searchDevelopers,
} from "../features/developers/developerSlice";

import DeveloperCard from "../components/DeveloperCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Stats from "../components/Stats";

export default function Explore() {
  const dispatch = useAppDispatch();

  const {
    developers,
    stats,
    loading,
    error,
  } = useAppSelector((state) => state.developers);

  const [skill, setSkill] = useState("");
  const [technology, setTechnology] = useState("");

  useEffect(() => {
    dispatch(fetchDevelopers());
    dispatch(fetchGraphStats());
  }, [dispatch]);

  const handleSearch = () => {
    if (!skill && !technology) {
      dispatch(fetchDevelopers());
      return;
    }

    dispatch(
      searchDevelopers({
        skill,
        technology,
      })
    );
  };

  const handleReset = () => {
    setSkill("");
    setTechnology("");

    dispatch(fetchDevelopers());
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Header */}
        <section className="mb-10">
          <div className="mb-3">
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
              Graph-powered developer explorer
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            GraphQuest
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-500">
            Explore relationships between developers, skills,
            projects and technologies using a graph database.
          </p>
        </section>

        {/* Graph Statistics */}
        {stats && (
          <section className="mb-10">
            <Stats
              developers={stats.developers}
              skills={stats.skills}
              projects={stats.projects}
              technologies={stats.technologies}
            />
          </section>
        )}

        {/* Search */}
        <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-950">
              Explore graph connections
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Find developers by traversing their skill and
              project relationships.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
            {/* Skill */}
            <div>
              <label
                htmlFor="skill"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Skill
              </label>

              <select
                id="skill"
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              >
                <option value="">Any skill</option>
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Node.js">Node.js</option>
                <option value="JavaScript">JavaScript</option>
                <option value="MongoDB">MongoDB</option>
              </select>
            </div>

            {/* Technology */}
            <div>
              <label
                htmlFor="technology"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Project technology
              </label>

              <select
                id="technology"
                value={technology}
                onChange={(event) =>
                  setTechnology(event.target.value)
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              >
                <option value="">Any technology</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="MongoDB">MongoDB</option>
                <option value="TypeScript">TypeScript</option>
                <option value="AWS">AWS</option>
              </select>
            </div>

            {/* Search button */}
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="rounded-xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Exploring..." : "Explore connections"}
            </button>
          </div>

          {(skill || technology) && (
            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
              <p className="text-xs text-zinc-500">
                Active filters:
                {skill && (
                  <span className="ml-2 rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-700">
                    {skill}
                  </span>
                )}

                {technology && (
                  <span className="ml-2 rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-700">
                    {technology}
                  </span>
                )}
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-zinc-600 hover:text-zinc-950"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* WHY A GRAPH SECTION */}
        <section className="mb-10 rounded-2xl border border-zinc-200 bg-zinc-900 p-6 text-white shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Why a graph?
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Discover relationships, not just records.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Developers, skills, projects and technologies are
            connected as graph entities, allowing
            relationship-based queries across multiple hops.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-lg bg-white/10 px-3 py-2">
              Developer
            </span>

            <span className="text-zinc-500">
              →
            </span>

            <span className="rounded-lg bg-white/10 px-3 py-2">
              Project
            </span>

            <span className="text-zinc-500">
              →
            </span>

            <span className="rounded-lg bg-white/10 px-3 py-2">
              Technology
            </span>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-8 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <div>
              <p className="font-medium text-red-800">
                Unable to load graph data
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                dispatch(fetchDevelopers());
                dispatch(fetchGraphStats());
              }}
              className="shrink-0 rounded-lg bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Developer Results */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-950">
                Developers
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {developers.length} developer
                {developers.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : developers.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {developers.map((developer) => (
                <DeveloperCard
                  key={developer.id}
                  developer={developer}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-200 py-8 text-center">
          <p className="text-xs text-zinc-400">
            GraphQuest · Built with React, Node.js & CognoDB
          </p>
        </footer>
      </div>
    </main>
  );
}
