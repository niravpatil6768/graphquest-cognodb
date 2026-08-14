interface GraphPathProps {
    developerName: string;
    projectName: string;
    technology: string;
  }
  
  export default function GraphPath({
    developerName,
    projectName,
    technology,
  }: GraphPathProps) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Graph relationship
          </h2>
  
          <p className="mt-1 text-sm text-zinc-500">
            A multi-hop path through the graph.
          </p>
        </div>
  
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
          <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center md:w-52">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Developer
            </p>
  
            <p className="mt-1 font-semibold text-zinc-900">
              {developerName}
            </p>
          </div>
  
          <div className="text-center">
            <div className="text-xs font-semibold text-zinc-500">
              WORKED_ON
            </div>
            <div className="text-zinc-400">→</div>
          </div>
  
          <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center md:w-52">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Project
            </p>
  
            <p className="mt-1 font-semibold text-zinc-900">
              {projectName}
            </p>
          </div>
  
          <div className="text-center">
            <div className="text-xs font-semibold text-zinc-500">
              USES
            </div>
            <div className="text-zinc-400">→</div>
          </div>
  
          <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center md:w-52">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Technology
            </p>
  
            <p className="mt-1 font-semibold text-zinc-900">
              {technology}
            </p>
          </div>
        </div>
      </div>
    );
  }