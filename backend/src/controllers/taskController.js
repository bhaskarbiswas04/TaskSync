import { Task } from "../models/Task.model.js";

//--RouteLogic: POST- Create Task
export const createTask = async (req, res)=>{
    try {
         const {
           name,
           project,
           team,
           owners,
           tags,
           priority,
           timeToComplete,
           status,
         } = req.body;

         //-validations
          if (!name || !project || !team) {
            return res.status(400).json({
              message: "Name, project, and team are required",
            });
          }

          if (!owners || owners.length === 0) {
            return res.status(400).json({
              message: "At least one owner is required",
            });
          }

          const task = await Task.create({
            name,
            project,
            team,
            owners,
            tags,
            priority,
            timeToComplete,
            status,
            createdBy: req.user._id,
          });

          return res.status(201).json({
            message: "Task created successfully",
            task,
          });
    } catch (error) {
        res.status(500).json({
          message: "Error creating task",
        });
    }
}

//--RouteLogic: GET- get all Task
export const getTasks = async (req, res)=>{
    try {
        const { team, owner, tags, project, status, priority, search } = req.query;

        let filter = {};

        if(team) filter.team = team;
        if(project) filter.project = project;
        if(status) filter.status = status;
        if(priority) filter.priority = priority;
        if(owner) filter.owners = { $in: [owner]};
        if(tags) filter.tags = { $in: tags.split(",")};

        const tasks = await Task.find(filter)
                    .populate("owners", "name email")
                    .populate("project", "name")
                    .populate("team", "name")
                    .sort({createdAt: -1});

        return res.json(tasks)
    } catch (error) {
        res.status(500).json({
          message: "Error fetching tasks",
        });
    }
}

//--RouteLogic: POST- Update a Task
export const updateTaskById = async (req, res)=>{
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        //-Authorization check
        if(
            task.createdBy.toString() !== req.user._id.toString() &&
            !task.owners.includes(req.user._id)
        ) {
            return res.status(403).json({
              message: "Not authorized to update this task",
            });
        }

        const allowedFields = ["name", "status", "timeToComplete", "tags"];

        allowedFields.forEach((field) => {
          if (req.body[field] !== undefined) {
            task[field] = req.body[field];
          }
        });

        await task.save();

        // POPULATE UPDATED TASK
        const populatedTask = await Task.findById(task._id)
          .populate("owners", "name email")
          .populate("project", "name")
          .populate("team", "name");

        return res.status(200).json({
          message: "Task Updated",
          task: populatedTask,
        });
    } catch (error) {
        res.status(500).json({
          message: "Error updating task",
        });
    }
}

//--RouteLogic: DELETE Task
export const deleteTask = async (req, res)=>{
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        //-only creator of the task is allowd to delete
        if (task.createdBy.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            message: "Not authorized to delete this task",
          });
        }

        await task.deleteOne();

        return res.json({
          message: "Task deleted",
        });
    } catch (error) {
        res.status(500).json({
          message: "Error deleting task",
        });
    }
}

//--RouteLogic: Get tasks by Id :
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("owners", "name email")
      .populate("project", "name")
      .populate("team", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task" });
  }
};