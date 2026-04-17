import { createContext, useContext, useEffect, useState } from "react";
import {
  getLastWeekReport,
  getPendingReport,
  getClosedTasksReport,
} from "../api/reportApi";
import { useAuth } from "./AuthContext";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [lastWeek, setLastWeek] = useState([]);
  const [pending, setPending] = useState(0);
  const [closedStats, setClosedStats] = useState({
    byTeam: {},
    byOwner: {},
    byProject: {},
  });

  const { user } = useAuth();


  const fetchReports = async () => {
    if(!user?._id) return;

    try {
      const [weekRes, pendingRes, closedRes] = await Promise.all([
        getLastWeekReport(),
        getPendingReport(),
        getClosedTasksReport(),
      ]);

      setLastWeek(weekRes.tasks || []);
      setPending(pendingRes.totalPendingHours || 0);
      setClosedStats(closedRes);
    } catch (err) {
      console.log("Report error:", err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchReports();
    }
  }, [user?._id]);

  return (
    <ReportContext.Provider
      value={{ lastWeek, pending, closedStats, fetchReports }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => useContext(ReportContext);
