const { User, task } = require('../model/model');
require('dotenv').config();
const userService = {
    createUser: async (userData) => {
        try {
            const user={
                name:userData.name,
                email:userData.email,
                password:process.env.SAMPLE_PASS
            }
            const newUser = new User(user);
            await newUser.save();
            return {
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                task:newUser.tasks
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllUsers: async () => {
        try {
            return await User.find();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getUserById: async (userId) => {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateUserById: async (userId, updatedData) => {
        try {
            return await User.findByIdAndUpdate(userId, updatedData, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deleteUserById: async (userId) => {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    assignTask: async (userId, taskId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.tasks.includes(taskId)) {
                throw new Error("Task already assigned");
            }
            const t = await task.findById(taskId);
            if (!t) {
                throw new Error("Task not found");
            }
            t.assignee = userId;
            await t.save();
            user.tasks.push(t);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = userService;
