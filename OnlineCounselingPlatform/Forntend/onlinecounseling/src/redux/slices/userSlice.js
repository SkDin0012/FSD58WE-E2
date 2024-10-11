import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5111/api/users';

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
    successMessage: null, 
};

export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; 
    } catch (error) {
        let errorMessage = { message: "Server Error" };
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data; 
        }
        return thunkAPI.rejectWithValue(errorMessage); 
    }
});

export const loginUser = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response ? error.response.data : error.message);
        return thunkAPI.rejectWithValue(
            error.response ? error.response.data : { message: "Server Error" }
        );
    }
});



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null; 
            state.successMessage = null; 
        },
        clearError: (state) => {
            state.error = null; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true; 
                state.error = null; 
                state.successMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload; 
                state.successMessage = 'Registration successful!';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload; 
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true; 
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false; 
                state.userInfo = action.payload;
                state.successMessage = 'Login successful!';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer; 
