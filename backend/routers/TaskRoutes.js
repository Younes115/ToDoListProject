const express =require("express");

const Task= require("../controller/TaskController");
const router =express.Router();


router.get("/tasks",Task.getTasks);
router.get("/tasks/:id",Task.getTask);

router.post("/tasks",Task.addTask);

router.put("/tasks/:id",Task.updateTask);
router.delete("/tasks/:id",Task.deleteTask);


module.exports =router;