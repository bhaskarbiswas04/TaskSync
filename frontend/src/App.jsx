import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectListPage";
import ProjectViewPage from "./pages/ProjectViewPage";
import TeamsPage from "./pages/TeamsPage";
import TeamViewPage from "./pages/TeamViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectViewPage />} />

        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamId" element={<TeamViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
