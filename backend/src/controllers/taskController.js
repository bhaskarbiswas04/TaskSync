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
    } catch (error) {
        
    }
}