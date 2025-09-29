const { message } = require('statuses');
const Task = require('../models/Task');


const getTasks = async(req,res)=>{
    try {
        const tasks = await Task.find({});
       
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({message:"an interal server error "})
    }
}

const addTask = async(req,res)=>{
    try {
        const {title}=req.body;
        if (!title) {
            return res.status(400).json({ message: "Task title is required." });
        }
        const task = new Task({
            title
        })
         
        await task.save();
        res.status(200).json(task);
    } catch (err) {
         res.status(400).json({ message: err.message }); 
    }
}

const getTask = async(req,res)=>{
    const {id}=req.params;
    try {
        const task = await Task.findById(id)
        res.status(200).json(task)
        
    } catch (err) {
        res.status(500).json({message:"an interal server error "})
    }
}

const updateTask = async(req,res)=>{
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
          { new: true, runValidators: true }  
        )
        if (!task){
            return res.status(404).json({ message: `No task with id: ${id}` });
        }
        res.status(200).json(task)
    } catch (err) {
         res.status(500).json({message:"an interal server error "})
    }
}

const deleteTask = async(req,res)=>{
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task){
           return res.status(404).json({message:"task not found"});
        }
        res.status(200).json("task deleted Successfully")
        
    } catch (err) {
        res.status(200).json({message: "Task deleted Successfully"})
    }
}

module.exports = {
    getTasks,
    addTask,
    getTask,
    updateTask,
    deleteTask
}