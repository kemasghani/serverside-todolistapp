const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskController');
const authorize = require('../middleware/authorize');

router.get('/', authorize, TaskController.getTasksByUserId);

router.post('/', authorize, TaskController.createTask);

router.put('/:id', authorize, TaskController.updateTask);

router.delete('/:id', authorize, TaskController.deleteTask);

module.exports = router;
