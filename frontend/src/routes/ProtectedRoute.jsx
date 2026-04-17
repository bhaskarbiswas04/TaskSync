import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const { triggerPageLoading } = useUI();

  useEffect(() => {
    if (loading) {
      triggerPageLoading(500); 
    }
  }, [loading]);

  if (loading) return null;

  if (!user) return <Navigate to="/login" />;

  return children;
}
