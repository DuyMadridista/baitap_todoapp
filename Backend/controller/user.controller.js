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
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
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
    assignTask: async (req, res) => {
        try {
            const { userId, taskId } = req.body;
            const user = await userService.assignTask(userId, taskId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;

// const { task, User } = require('../model/model');
// const userController = {
//     // Create a new user
//     createUser: async (req, res) => {
//         try {
//             const newUser = new User(req.body);
//             await newUser.save();
//             res.status(201).json(newUser);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
//     // Get all users
//     getAllUsers: async (req, res) => {
//         try {
//             const users = await User.find();
//             res.status(200).json(users);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
//     // get a user by id
//     getUserById: async (req, res) => {
//         try {
//             const u = await User.findById(req.params.id);
//             res.status(200).json(u);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
//     // Update a user by id
//     updateUserById: async (req, res) => {
//         try {
//             const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//             res.status(200).json(updatedUser);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
//     // Delete a user by id
//     deleteUserById: async (req, res) => {
//         try {
//             const deletedUser = await User.findByIdAndDelete(req.params.id);
//             res.status(200).json(deletedUser);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//     // assign task to user
//     , assignTask: async (req, res) => {
//         try {
//             const { userId, taskId } = req.body;
//             const user = await User.findById(userId);
//             if (!user) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             if (user.tasks.includes(taskId)) {
//                 return res.status(400).json({ message: "Task already assigned" });
//             }
//             const task = await task.findById(taskId);
//             if (!task) {
//                 return res.status(404).json({ message: "Task not found" });
//             }
//             task.assignee = userId;
//             await task.save();
//             user.tasks.push(task);
//             await user.save();
//             res.status(200).json(user);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }

// };
// module.exports = userController;