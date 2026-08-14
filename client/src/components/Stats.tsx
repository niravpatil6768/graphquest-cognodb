interface StatsProps {
  developers: number;
  skills: number;
  projects: number;
  technologies: number;
}

export default function Stats({
  developers,
  skills,
  projects,
  technologies,
}: StatsProps) {
  const stats = [
    {
      label: "Developers",
      value: developers,
    },
    {
      label: "Skills",
      value: skills,
    },
    {
      label: "Projects",
      value: projects,
    },
    {
      label: "Technologies",
      value: technologies,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-zinc-200 bg-white p-5"
        >
          <p className="text-sm text-zinc-500">{stat.label}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
