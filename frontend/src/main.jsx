import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {Toaster} from "react-hot-toast"
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
      <App />
    </AuthProvider>
  </StrictMode>,
);
