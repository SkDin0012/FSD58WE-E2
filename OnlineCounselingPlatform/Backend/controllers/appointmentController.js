const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
    try {
        const { date, time, description } = req.body;
        
        const appointment = await Appointment.create({
            date,
            time,
            description,
            client: req.user._id, 
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ client: req.user._id }) 
            .populate('client')
            .populate('counselor');

        res.json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createAppointment, getAppointments };
