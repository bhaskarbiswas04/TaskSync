import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {Toaster} from "react-hot-toast"
import { AuthProvider } from './context/AuthContext.jsx'
import { TeamProvider } from './context/TeamContext.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TeamProvider>
        <ProjectProvider>
          <TaskProvider>
            <Toaster
              toastOptions={{
                style: {
                  background: "#1f2937",
                  color: "#fff",
                },
              }}
            />
            <App />
          </TaskProvider>
        </ProjectProvider>
      </TeamProvider>
    </AuthProvider>
  </StrictMode>,
);
