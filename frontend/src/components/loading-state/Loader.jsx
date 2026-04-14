export default function Loader({ fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen" : "h-40"
      }`}
    >
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}