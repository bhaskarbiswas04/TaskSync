import { Task } from "../models/Task.model.js";

//---Create new Task - POST
export const createTask = async (req, res)=>{
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            message: " Task created successfully",
            task,
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating task",
        })
    }
}