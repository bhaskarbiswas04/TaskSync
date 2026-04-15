import DashboardLayout from "../layouts/DashboardLayout";
import { useTasks } from "../context/TaskContext";
import { useEffect } from "react";
import { useUI } from "../context/UIContext";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

// register chart
ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

export default function ReportsPage() {
  const { tasks } = useTasks();
  const { triggerPageLoading } = useUI();

  useEffect(() => {
    triggerPageLoading(500);
  }, []);

  if (!tasks) return null;

  // 1. TASKS COMPLETED LAST WEEK

  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toDateString();
  });

  const completedTasks = tasks.filter((t) => t.status === "Completed");

  const tasksPerDay = last7Days.map((day) => {
    return completedTasks.filter(
      (t) => new Date(t.updatedAt).toDateString() === day,
    ).length;
  });

  const lastWeekData = {
    labels: last7Days.reverse(),
    datasets: [
      {
        label: "Tasks Completed",
        data: tasksPerDay.reverse(),
        backgroundColor: "#06b6d4", // cyan
        borderRadius: 6,
      },
    ],
  };

// 2. TOTAL PENDING WORK

  const pendingTasks = tasks.filter((t) => t.status !== "Completed");

  const totalPendingHours = pendingTasks.reduce(
    (acc, t) => acc + (t.timeToComplete || 0),
    0,
  );

  const pendingData = {
    labels: ["Pending Work"],
    datasets: [
      {
        label: "Hours",
        data: [totalPendingHours],
        backgroundColor: "#f59e0b", // amber
        borderRadius: 6,
      },
    ],
  };

  // =========================
  // 🔥 3. TASKS BY TEAM
  // =========================

  const teamMap = {};

  completedTasks.forEach((t) => {
    const name = t.team?.name || "Unknown";
    teamMap[name] = (teamMap[name] || 0) + 1;
  });

  const teamData = {
    labels: Object.keys(teamMap),
    datasets: [
      {
        data: Object.values(teamMap),
        backgroundColor: [
          "#3b82f6", // blue
          "#10b981", // green
          "#f59e0b", // yellow
          "#ef4444", // red
          "#8b5cf6", // purple
        ],
      },
    ],
  };

  // =========================
  // 🔥 4. TASKS BY OWNER
  // =========================

  const ownerMap = {};

  completedTasks.forEach((t) => {
    t.owners?.forEach((o) => {
      ownerMap[o.name] = (ownerMap[o.name] || 0) + 1;
    });
  });

  const ownerData = {
    labels: Object.keys(ownerMap),
    datasets: [
      {
        data: Object.values(ownerMap),
        backgroundColor: [
          "#22c55e",
          "#06b6d4",
          "#f97316",
          "#a855f7",
          "#e11d48",
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb", // light gray text
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

 return (
  <DashboardLayout>
    <div className="p-6">
      <h1 className="text-3xl text-white font-bold mb-6">Reports</h1>

      {/* 🔥 2x2 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. LAST WEEK */}
        <div className="bg-white/5 p-5 rounded-xl h-80 flex flex-col">
          <h2 className="text-white mb-4">Tasks Completed Last Week</h2>
          <div className="flex-1">
            <Bar
              data={lastWeekData}
              options={{ ...chartOptions, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* 2. PENDING */}
        <div className="bg-white/5 p-5 rounded-xl h-80 flex flex-col">
          <h2 className="text-white mb-4">Total Pending Work (Hours)</h2>
          <div className="flex-1">
            <Bar
              data={pendingData}
              options={{ ...chartOptions, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* 3. TEAM */}
        <div className="bg-white/5 p-5 rounded-xl h-80 flex flex-col">
          <h2 className="text-white mb-4">Tasks Closed by Team</h2>
          <div className="flex-1">
            <Pie
              data={teamData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* 4. OWNER */}
        <div className="bg-white/5 p-5 rounded-xl h-80 flex flex-col">
          <h2 className="text-white mb-4">Tasks Closed by Owner</h2>
          <div className="flex-1">
            <Pie
              data={ownerData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

      </div>
    </div>
  </DashboardLayout>
);
}