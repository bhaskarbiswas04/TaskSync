import API_BASE_URL from "./axios";

//--Last Week
export const getLastWeekReport = async ()=>{
    const response = await API_BASE_URL.get("/reports/last-week");
    return response.data;
}

//--Pending
export const getPendingReport = async ()=>{
    const response = await API_BASE_URL.get("/reports/pending");
    return response.data;
}

//--Closed Tasks
export const getClosedTasksReport = async ()=> {
    const response = await API_BASE_URL.get("/reports/closed-tasks");
    return response.data;
}