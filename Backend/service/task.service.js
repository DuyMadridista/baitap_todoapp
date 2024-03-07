const { task, User } = require('../model/model');

const taskService = {
    createTask: async (taskData) => {
        try {
            const newTask = new task(taskData);
            await newTask.save();
            if (taskData.assignee) {
                const user = await User.findById(taskData.assignee);
                if (!user) throw new Error("Assignee not found");
                if (!user.tasks) {
                    user.tasks = [newTask];
                } else {
                    user.tasks.push(newTask);
                }
                await user.save();
            }
            return newTask;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllTasks: async () => {
        try {
            return await task.find();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getTaskById: async (taskId) => {
        try {
            return await task.findById(taskId).populate('assignee')
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateTaskById: async (taskId, updatedData) => {
        try {
            return await task.findByIdAndUpdate(taskId, updatedData, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deleteTaskById: async (taskId) => {
        try {
            return await task.findByIdAndDelete(taskId);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    searchTask: async (state) => {
        try {
            return await task.find({ state: state });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getTasks: async (page, limit, sort, title) => {
        try {
            return await task.find({ title: { $regex: new RegExp(title, 'i') } })
                .populate('assignee', 'name')
                .sort({ title: parseInt(sort) })
                .skip((page - 1) * limit)
                .limit(limit);
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = taskService;
