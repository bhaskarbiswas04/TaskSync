import { Team } from "../models/Team.model.js";

//--RouteLogic: POST- create a new Team
export const createTeam = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    //--validations
    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const team = await Team.create({
      name,
      description,
      members,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating team",
    });
  }
};

//--RouteLogic: GET- get all Team : User-specific
export const getTeams = async (req, res)=>{
    try {
        const teams = await Team.find({
            $or: [
                { createdBy: req.user._id},
                { members: req.user._id},
            ]
        }).populate("members", "name email");

        return res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({
          message: "Error fetching teams",
        });
    }
}

//--RouteLogic: GET- all Teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("members", "name email avatar")

    //-Validation
    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "No teams found" });
    }

    return res.status(200).json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching teams",
    });
  }
};