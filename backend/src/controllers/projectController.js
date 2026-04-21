import { Project } from "../models/Project.model.js";

//--RouteLogic: POST- Create New Project.
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    //-Validations
    if (!name) {
      return res.status(400).json({ message: "Provide Project Name" });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating project",
    });
  }
};

//--RouteLogic: GET- Fetch all projects created by user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user._id,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.json(projects);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching projects",
    });
  }
};

//--RouteLogic: GET- Fetch all projects in the database
export const getAllProjects = async (req, res) => {
  try {
    // Passing an empty object {} to .find() retrieves every document in the collection
    const projects = await Project.find({})
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    // Handle case where no projects exist
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found in the database" });
    }

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching all projects",
      error: error.message
    });
  }
};