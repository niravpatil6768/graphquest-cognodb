interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white">
      <p className="text-sm text-zinc-500">{message}</p>
    </div>
  );
}
