const express = require('express');
const { signup, login, getCloset, addToCloset } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/closet', authMiddleware, getCloset);
router.post('/closet', authMiddleware, addToCloset);

module.exports = router;
