const userService = require('../service/user.service');

const userController = {
    createUser: async (req, res) => {
        try {

            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUsers: async (req, res) => {
        try {
            const { page, limit, sort, search } = req.query;
            const users = await userService.getUsers(search,sort, page, limit);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userService.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await userService.updateUserById(userId, req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await userService.deleteUserById(userId);
            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const total = await userService.getAllUsers();
            res.status(200).json(total);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;
