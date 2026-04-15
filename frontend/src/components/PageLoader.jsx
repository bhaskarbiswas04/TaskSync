export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-600"></div>
      </div>
    </div>
  );
}