const taskService = require('../service/task.service');

const taskController = {
    createTask: async (req, res) => {
        try {
            const newTask = await taskService.createTask(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllTasks: async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTaskById: async (req, res) => {
        try {
            const taskId = req.params.id;
            const task = await taskService.getTaskById(taskId);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateTaskById: async (req, res) => {
        try {
            const taskId = req.params.id;
            const updatedTask = await taskService.updateTaskById(taskId, req.body);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteTaskById: async (req, res) => {
        try {
            const taskId = req.params.id;
            const deletedTask = await taskService.deleteTaskById(taskId);
            res.status(200).json(deletedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    searchTask: async (req, res) => {
        try {
            const { state } = req.query;
            const tasks = await taskService.searchTask(state);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTasks: async (req, res) => {
        try {
            const { page, limit, sort, title } = req.query;
            const tasks = await taskService.getTasks(page, limit, sort, title);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = taskController;

// const { task, User } = require('../model/model');
// const taskController = {
//     // Create a new task
//     createTask: async (req, res) => {
//         try {

//             const newTask = new task(req.body);
//             await newTask.save();
//             if (req.body.assignee) {
//                 const user = await User.findById(req.body.assignee);
//                 if (!user) return res.status(404).json({ message: "Assignee not found" });
//                 if (!user.tasks) {
//                     user.tasks = [newTask];
//                 } else {
//                     user.tasks.push(newTask);
//                 }
//                 await user.save();
//             }
//             res.status(201).json(newTask);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
//     // Get all tasks
//     getAllTasks: async (req, res) => {
//         try {
//             const tasks = await task.find();
//             res.status(200).json(tasks);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//     // get a task by id
//     , getTaskById: async (req, res) => {
//         try {
//             const t = await task.findById(req.params.id);
//             res.status(200).json(t);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//     // Update a task by id
//     , updateTaskById: async (req, res) => {
//         try {
//             const updatedTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//             res.status(200).json(updatedTask);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//     // Delete a task by id
//     , deleteTaskById: async (req, res) => {
//         try {
//             const deletedTask = await task.findByIdAndDelete(req.params.id);
//             res.status(200).json(deletedTask);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//     // get tasks by state
//     , searchTask: async (req, res) => {
//         try {
//             const { state } = req.query;
//             const tasks = await task.find({ state: state });
//             res.status(200).json(tasks);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//     // get taskes by title or description, paging and sorting
//     , getTasks: async (req, res) => {
//         try {
//             const { page, limit, sort, title } = req.query;
//             console.log(parseInt(sort));
//             const tasks = await task.find({ title: { $regex: new RegExp(title, 'i') } }).sort({ title: parseInt(sort) }).skip((page - 1) * limit).limit(limit);
//             res.status(200).json(tasks);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }

// }
// module.exports = taskController;