import { createContext, useContext, useState, useEffect } from "react";
import { getAllTeams } from "../api/teamApi";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getAllTeams().then(setTeams);
  }, []);

  return (
    <TeamContext.Provider value={{ teams }}>{children}</TeamContext.Provider>
  );
};

export const useTeams = () => useContext(TeamContext);
