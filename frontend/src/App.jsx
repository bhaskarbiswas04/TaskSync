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
import SettingsPage from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage";

import { UIProvider, useUI } from "./context/UIContext";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { TeamProvider } from "./context/TeamContext";
import { ReportProvider } from "./context/ReportContext";

import PageLoader from "./components/PageLoader";

// Wrapper for all protected providers
function AppProviders({ children }) {
  return (
    <ProjectProvider>
      <TaskProvider>
        <TeamProvider>
          <ReportProvider>{children}</ReportProvider>
        </TeamProvider>
      </TaskProvider>
    </ProjectProvider>
  );
}

function AppContent() {
  const { pageLoading } = useUI();

  return (
    <>
      {pageLoading && <PageLoader />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppProviders>
                <DashboardPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <AppProviders>
                <ProjectsPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <AppProviders>
                <ProjectViewPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <AppProviders>
                <TeamsPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams/:teamId"
          element={
            <ProtectedRoute>
              <AppProviders>
                <TeamViewPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:taskId"
          element={
            <ProtectedRoute>
              <AppProviders>
                <TaskViewPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <AppProviders>
                <ReportsPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppProviders>
                <SettingsPage />
              </AppProviders>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
