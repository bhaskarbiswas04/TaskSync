import API_BASE_URL from "./axios";

export const getTeams = async () => {
  const res = await API_BASE_URL.get("/teams");
  return res.data;
};

export const getAllTeams = async ()=>{
  const response = await API_BASE_URL.get("/teams/all");
  console.log("Respose for all teams: ", response.data.teams);
  
  return response.data.teams;
}

export const addMembersToTeam = async (teamId, members) => {
  const res = await API_BASE_URL.post(`/teams/${teamId}/add-member`, {
    members,
  });

  return res.data;
};
