const userRouter = require('express').Router();
const userController = require('../controller/user.controller');
const verifySignUp  = require('../middleware/authMiddleware');

userRouter.use(verifySignUp.verifyToken)
userRouter.get('/', userController.getAllUsers);
userRouter.post('/',verifySignUp.checkDuplicateEmail, userController.createUser);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUserById);
userRouter.delete('/:id', userController.deleteUserById);
userRouter.post('/assign', userController.assignTask);
module.exports = userRouter;