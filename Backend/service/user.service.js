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
    getUsers: async (search='',sort=1,page=1,limit=2) => {
        try {
            return await User.find({ name: { $regex: new RegExp(search, 'i') } })
                .populate('tasks')
                .sort({ name: parseInt(sort) })
                .skip((page - 1) * limit)
                .limit(limit);
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
    getAllUsers: async () => {
        try {
            return await User.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = userService;
