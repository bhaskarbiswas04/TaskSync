import { createContext, useContext, useEffect, useState } from "react";
import API_BASE_URL from "../api/axios";

const AuthContext =  createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //--Load users if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      API_BASE_URL.get("/auth/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log("AUTO LOGIN ERROR:", err);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  //signup
  const signup = async (formData) => {
    const res = await API_BASE_URL.post("/auth/signup", formData);
    return res.data;
  };

  //login
  const login = async (formData) => {
    const res = await API_BASE_URL.post("/auth/login", formData);

    console.log("LOGIN SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    return res.data;
  };

  // Logout
    //   const logout = () => {
    //     localStorage.removeItem("token");
    //     setUser(null);
    //   };

    return (
        <AuthContext.Provider value={{user, signup, login, loading}}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
