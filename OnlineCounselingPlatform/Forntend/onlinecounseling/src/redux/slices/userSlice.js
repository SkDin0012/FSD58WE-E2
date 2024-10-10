import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        console.log("the get data",userData);
        const response = await axios.post('/api/users/register', userData);
        console.log("the post data",userData);
        return response.data;
    } catch (error) {
        let errorMessage = { message: "Server Error" };
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data;
        } else if (error.message) {
            errorMessage = { message: error.message };
        }
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const loginUser = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('/api/users/login', userData);
        return response.data;
    } catch (error) {
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
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
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
