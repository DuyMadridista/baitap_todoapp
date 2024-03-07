const router = require('express').Router();
const taskController = require('../controller/task.controller');
const verifySignUp  = require('../middleware/authMiddleware').verifyToken;
router.use(verifySignUp)
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);
router.get('/search', taskController.searchTask);
module.exports = router;