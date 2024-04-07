const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskController');

router.get('/', TaskController.getTasksByUserId);

router.post('/', TaskController.createTask);

router.get('/all', TaskController.getAllTasks);

router.put('/:id', TaskController.updateTask);

router.delete('/:id', TaskController.deleteTask);

module.exports = router;
