import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5111/api/appointments';

const initialState = {
    appointments: [],
    loading: false,
    error: null,
};

export const createAppointment = createAsyncThunk('appointment/create', async (appointmentData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token; 

    try {
        const response = await axios.post(`${API_URL}/create`, appointmentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const fetchAppointments = createAsyncThunk('appointment/getsd', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token; 

    try {
        const response = await axios.get(`${API_URL}/getsd`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
});



const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments.push(action.payload);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default appointmentSlice.reducer;
