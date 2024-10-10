const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/admin-route', authMiddleware(['admin']), (req, res) => {
    res.json({ message: 'This is a protected route for admin only' });
});
router.get('/counselor-route', authMiddleware(['counselor', 'admin']), (req, res) => {
    res.json({ message: 'This is a protected route for counselor and admin' });
});

router.get('/user-route', authMiddleware(), (req, res) => {
    res.json({ message: 'This is a protected route for authenticated users' });
});

module.exports = router;
