// skeleton card — loading placeholder with shimmer animation

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card">
      <div className="h-48 animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-12 rounded animate-shimmer" />
        <div className="h-4 w-3/4 rounded animate-shimmer" />
        <div className="h-3 w-1/2 rounded animate-shimmer" />
      </div>
    </div>
  );
}
