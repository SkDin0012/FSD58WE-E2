const express = require('express');
const {
    createAppointment,
    getAppointments
} = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', authMiddleware, createAppointment); 
router.get('/', authMiddleware, getAppointments);     

module.exports = router;
