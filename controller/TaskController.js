const { Task } = require('../models'); // Assuming Task model is correctly defined

const TaskController = {
    async createTask(req, res) {
        try {
            const { title, description, due_date, priority } = req.body;
            const task = await Task.create({ title, description, due_date, priority, status: 'Pending' });
            res.status(201).json({ message: 'Task created successfully', task });
        } catch (error) {
            res.status(500).json({ error: 'Task creation failed', message: error.message });
        }
    },

    async getAllTasks(req, res) {
        try {
            const tasks = await Task.findAll();
            res.status(200).json({ tasks });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks', message: error.message });
        }
    },

    async getTaskById(req, res) {
        try {
            const taskId = req.params.id;
            const task = await Task.findByPk(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ task });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch task', message: error.message });
        }
    },

    async updateTaskStatus(req, res) {
        try {
            const taskId = req.params.id;
            const { status } = req.body;
            const task = await Task.findByPk(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            await task.update({ status });
            res.status(200).json({ message: 'Task status updated successfully', task });
        } catch (error) {
            res.status(500).json({ error: 'Task status update failed', message: error.message });
        }
    },

    async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            const task = await Task.findByPk(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            await task.destroy();
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Task deletion failed', message: error.message });
        }
    },
};

module.exports = TaskController;
