const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Sesuaikan dengan nama model User Anda

const UserController = {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed', message: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Login failed', message: error.message });
        }
    },
};

module.exports = UserController;
