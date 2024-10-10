const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (requiredRoles = []) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id).select('-password');

                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }

                if (requiredRoles.length && !requiredRoles.includes(user.role)) {
                    return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
                }

                req.user = user;
                next();
            } catch (error) {
                res.status(401).json({ message: 'Not authorized, token failed' });
            }
        } else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    };
};

module.exports = authMiddleware;
