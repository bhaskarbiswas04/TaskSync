import { createContext, useContext, useState, useEffect } from "react";
import { getAllTeams, addMembersToTeam } from "../api/teamApi";
import toast from "react-hot-toast";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Teams
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await getAllTeams();
      setTeams(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  // Add Members (REAL-TIME UPDATE)
  const addMembers = async (teamId, members) => {
    try {
      const res = await addMembersToTeam(teamId, members);

      // Update only that team (no refetch needed)
      setTeams((prev) =>
        prev.map((team) => (team._id === teamId ? res.team : team)),
      );

      return res.team;
    } catch (err) {
      console.log(err);
      toast.error("Failed to add members");
    }
  };

  // 🔥 Initial Load
  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider
      value={{
        teams,
        setTeams,
        fetchTeams,
        addMembers,
        loading,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => useContext(TeamContext);