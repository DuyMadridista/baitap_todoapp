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
            const {content,assignee} = req.query;
            const tasks = await taskService.getAllTasks(content, assignee);
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
