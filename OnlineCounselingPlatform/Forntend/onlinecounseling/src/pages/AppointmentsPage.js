import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentForm from '../components/AppointmentForm';
import { fetchAppointments } from '../redux/slices/appointmentSlice';

const AppointmentsPage = () => {
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.appointments.list);
    const loading = useSelector((state) => state.appointments.loading);
    const error = useSelector((state) => state.appointments.error);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    return (
        <div className="container">
            <AppointmentForm />
            {loading && <p>Loading appointments...</p>}
            {error && <p>Error fetching appointments: {error}</p>}
            <h2>Appointment List</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        {new Date(appointment.date).toLocaleString()} - Counselor: {appointment.counselor.name} - Client: {appointment.client.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentsPage;
