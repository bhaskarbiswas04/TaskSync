import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const { triggerPageLoading } = useUI();

  if (loading) {
    triggerPageLoading(); 
    return null;
  }

  if (!user) return <Navigate to="/login" />;

  return children;
}
