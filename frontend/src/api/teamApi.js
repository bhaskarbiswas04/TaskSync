import API_BASE_URL from "./axios";

export const getTeams = async () => {
  const res = await API_BASE_URL.get("/teams");
  return res.data;
};
