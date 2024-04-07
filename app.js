const express = require('express');
const app = express();
const TaskController = require('./controller/TaskController');

// Define routes
app.get('/tasks', TaskController.getAllTasks);
app.get('/tasks/:id', TaskController.getTaskById);
app.post('/tasks', TaskController.createTask);
app.put('/tasks/:id', TaskController.updateTaskStatus);
app.delete('/tasks/:id', TaskController.deleteTask);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
