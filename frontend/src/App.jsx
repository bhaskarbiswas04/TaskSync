import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectListPage";
import ProjectViewPage from "./pages/ProjectViewPage";
import TeamsPage from "./pages/TeamsPage";
import TeamViewPage from "./pages/TeamViewPage";
import TaskViewPage from "./pages/TaskViewPage";
import ReportsPage from "./pages/ReportsPage";

import { UIProvider, useUI } from "./context/UIContext";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { TeamProvider } from "./context/TeamContext";
import { ReportProvider } from "./context/ReportContext";

import PageLoader from "./components/PageLoader";

function AppContent() {
  const { pageLoading } = useUI();

  return (
    <>
      {pageLoading && <PageLoader />}

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
        <Route path="/tasks/:taskId" element={<TaskViewPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
          <ReportProvider>
            <ProjectProvider>
              <TaskProvider>
                <TeamProvider>
                  <AppContent />
                </TeamProvider>
              </TaskProvider>
            </ProjectProvider>
          </ReportProvider>
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
