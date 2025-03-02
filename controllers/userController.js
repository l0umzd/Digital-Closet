const User = require(Digital-Closet/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Sign Up
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ username, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// User Log In
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get User Closet
exports.getCloset = async (req, res) => {
    const userId = req.user.id; // user id from token
    try {
        const user = await User.findById(userId);
        res.json(user.closet);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Add to Closet
exports.addToCloset = async (req, res) => {
    const userId = req.user.id;
    const { item } = req.body;
    try {
        const user = await User.findById(userId);
        user.closet.push(item);
        await user.save();
        res.json(user.closet);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
