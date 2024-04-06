const { Task, User, UserTask } = require('../models');

const TaskController = {
    async createTask(req, res) {
        try {
            const { title, description, due_date, priority, status } = req.body;
            const userId = req.userId;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const task = await Task.create({ title, description, due_date, priority, status });
            await UserTask.create({ user_id: userId, task_id: task.id });
            res.status(201).json({ message: 'Task created successfully', task });
        } catch (error) {
            res.status(500).json({ error: 'Task creation failed', message: error.message });
        }
    },

    async getTasksByUserId(req, res) {
        try {
            const userId = req.userId;
            const tasks = await Task.findAll({
                include: {
                    model: User,
                    where: { id: userId },
                    through: { attributes: [] }, // To exclude extra attributes from UserTask
                },
            });
            res.status(200).json({ tasks });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks', message: error.message });
        }
    },

    async updateTask(req, res) {
        try {
            const taskId = req.params.id;
            const { title, description, due_date, priority, status } = req.body;
            const task = await Task.findByPk(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            await task.update({ title, description, due_date, priority, status });
            res.status(200).json({ message: 'Task updated successfully', task });
        } catch (error) {
            res.status(500).json({ error: 'Task update failed', message: error.message });
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
