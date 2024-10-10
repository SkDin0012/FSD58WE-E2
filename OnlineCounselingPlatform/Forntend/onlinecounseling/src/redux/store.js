
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        appointment: appointmentReducer,
    },
});

export default store;
