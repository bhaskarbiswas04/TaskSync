import { Task } from "../models/Task.model.js"

// --RouteLogic : Last Week Completed Task
export const getLastWeekReport = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const tasks = await Task.find({
      status: "Completed",
      updatedAt: { $gte: sevenDaysAgo },
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching last week report" });
  }
};

// --RouteLogic: Total Pending Works
export const getPendingWorkReport = async (req, res)=>{
    try {
      const tasks = await Task.find({
        status: { $ne: "Completed" },
      });

      const totalPending = tasks.reduce(
        (acc, task) => acc + (task.timeToComplete || 0),
        0,
      );

      return res.status(200).json({
        success: true,
        totalPendingHours: totalPending,
      });
    } catch (err) {
      res.status(500).json({ message: "Error fetching pending work" });
    }
}

// --RouteLogic: Closed Tasks (Team, Owner, Project)
export const getClosedTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find({
      status: "Completed",
    })
      .populate("team", "name")
      .populate("project", "name")
      .populate("owners", "name");

    const teamMap = {};
    const projectMap = {};
    const ownerMap = {};

    tasks.forEach((task) => {
      // TEAM
      const teamName = task.team?.name || "Unknown";
      teamMap[teamName] = (teamMap[teamName] || 0) + 1;

      // PROJECT
      const projectName = task.project?.name || "Unknown";
      projectMap[projectName] = (projectMap[projectName] || 0) + 1;

      // OWNERS
      task.owners?.forEach((owner) => {
        ownerMap[owner.name] = (ownerMap[owner.name] || 0) + 1;
      });
    });
    return res.status(200).json({
      success: true,
      byTeam: teamMap,
      byProject: projectMap,
      byOwner: ownerMap,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching closed tasks report" });
  }
};