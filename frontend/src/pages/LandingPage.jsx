import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5 bg-[#020617]/80 backdrop-blur-lg border-b border-white/10">
        <h1 className="text-4xl font-bold text-cyan-400">TaskSync</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition"
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-black font-semibold cursor-pointer transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight">
          Manage Projects.
          <br />
          Track Tasks.
          <br />
          <span className="text-cyan-400">Stay in Sync.</span>
        </h1>

        <p className="text-gray-400 mt-6 text-lg">
          TaskSync helps teams collaborate, manage tasks, and track progress —
          all in one place.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-black font-semibold transition"
          >
            Start for Free
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Project Management",
              desc: "Organize projects and track progress with ease.",
            },
            {
              title: "Team Collaboration",
              desc: "Assign tasks and collaborate with your team.",
            },
            {
              title: "Real-time Reports",
              desc: "Visualize progress with charts and analytics.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            "Create Projects & Teams",
            "Assign Tasks & Owners",
            "Track Progress & Reports",
          ].map((step, i) => (
            <div key={i}>
              <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                {i + 1}
              </div>
              <p className="text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-white/5 border-t border-white/10">
        <h2 className="text-3xl font-bold">
          Ready to boost productivity?
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-black font-semibold"
        >
          Get Started Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} TaskSync. All rights reserved.
      </footer>
    </div>
  );
}