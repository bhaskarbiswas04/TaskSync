export default function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/3"></div>
    </div>
  );
}