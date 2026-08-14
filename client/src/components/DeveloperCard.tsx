import { Link } from "react-router-dom";

import type { Developer } from "../features/developers/developerTypes";

interface DeveloperCardProps {
  developer: Developer;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <Link
      to={`/developers/${developer.id}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white">
        {developer.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)}
      </div>

      <h3 className="font-semibold text-zinc-900">{developer.name}</h3>

      <p className="mt-1 text-sm text-zinc-500">{developer.title}</p>

      <div className="mt-5 text-sm font-medium text-zinc-900">
        View profile
        <span className="ml-1 transition group-hover:ml-2">→</span>
      </div>
    </Link>
  );
}
