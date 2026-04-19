import API_BASE_URL from "./axios";

export const getAllUsers = async () => {
  const res = await API_BASE_URL.get("/auth/all-users");
  return res.data.users;
};


// Settings -routes
export const updateProfile = (data) => API_BASE_URL.post("/settings/profile", data);

export const changePassword = (data) => API_BASE_URL.post("/settings/password", data);

export const updatePreferences = (data) =>
  API_BASE_URL.post("/settings/preferences", data);

export const deleteAccount = () => API_BASE_URL.delete("/settings/delete");
