import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5111/api/session-notes';

const initialState = {
    sessionNotes: [],
    loading: false,
    error: null,
};

export const createSessionNote = createAsyncThunk('sessionNotes/createSession', async (noteData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/createSession`, noteData); 
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to create session note');
    }
});

export const fetchSessionNotes = createAsyncThunk('sessionNotes/getSessionNotes', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/getSessionNotes`); 
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to fetch session notes');
    }
});



const sessionNoteSlice = createSlice({
    name: 'sessionNotes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSessionNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSessionNote.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionNotes.push(action.payload); 
            })
            .addCase(createSessionNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSessionNotes.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchSessionNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionNotes = action.payload; 
            })
            .addCase(fetchSessionNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sessionNoteSlice.reducer;
