const Task = require('../models/Task')

const asyncWrapper = require('../middleware/async')
const {creatCustomError} = require('../errors/Custom-error')

// get all tasks
const getAllTasks = asyncWrapper( async (req, res)=> {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

// create a task
const createTasks = asyncWrapper(async(req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

// get one task
const getTask = asyncWrapper(async(req, res, next) =>{
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID});
    if(!task){
      return next(createCustomError(`No Task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})

// update task
const updateTasks = asyncWrapper(async (req, res) =>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
      new: true, 
      runValidator: true,
    })
    if(!task){
      return next(createCustomError(`No Task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})

// delete task
const deleteTasks = asyncWrapper(async(req, res) =>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
      return next(createCustomError(`No Task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})

module.exports = {
  getAllTasks, 
  createTasks,
  getTask,
  updateTasks,
  deleteTasks
}
