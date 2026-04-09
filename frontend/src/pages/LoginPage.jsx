import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      await login(form);

      toast.success("Welcome Back");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-96 space-y-5 shadow-xl"
      >
        <h2 className="text-indigo-400 text-4xl font-bold text-center">
          TaskS
          <span className="text-indigo-600">ync</span>
        </h2>

        <p className="text-gray-300 text-sm text-center">
          Login to your account
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 transition p-3 rounded-lg text-white font-semibold cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-300 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}