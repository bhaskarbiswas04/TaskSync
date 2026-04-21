import { Project } from "../models/Project.model.js";
import { Team } from "../models/Team.model.js";

//--RouteLogic: POST- Create New Project.
export const createProject = async (req, res) => {
  try {
    const { name, description, team } = req.body;

    //-Validations
    if (!name) {
      return res.status(400).json({ message: "Provide Project Name" });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Project created successfully:", project });
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};

//--RouteLogic: GET- user-based filtering (projects where user belongs to team)
export const getProjects = async (req, res) => {
  try {
    // Get teams where user belongs
    const teams = await Team.find({
      $or: [{ createdBy: req.user._id }, { members: req.user._id }],
    }).select("_id");

    const teamIds = teams.map((t) => t._id);

    const projects = await Project.find({
      team: { $in: teamIds },
    })
      .populate("team", "name")
      .populate("createdBy", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
    });
  }
};
