import { Team } from "../models/Team.model.js";
import { User } from "../models/User.model.js";

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
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      $or: [{ createdBy: req.user._id }, { members: req.user._id }],
    }).populate("members", "name email");

    return res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching teams",
    });
  }
};

//--RouteLogic: GET- all Teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("members", "name email avatar");

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

//--RouteLogic: POST- Add Multiple Users/Members
export const addMembersToTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { members } = req.body;

    if (!members || members.length === 0) {
      return res.status(400).json({
        message: "No members provided",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    //convets objectId to string.
    const existingMembers = team.members.map((m) => m.toString());

    const uniqueMembers = members.filter((m) => !existingMembers.includes(m));

    team.members.push(...uniqueMembers);

    await team.save();

    const updatedTeam = await Team.findById(teamId).populate(
      "members",
      "name email",
    );

    return res.status(200).json({
      message: "Members added successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.log("ADD MEMBER ERROR:", error); // DEBUG
    res.status(500).json({
      message: "Server error",
    });
  }
};