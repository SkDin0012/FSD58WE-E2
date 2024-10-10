import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    sessionNotes: [],
    loading: false,
    error: null,
};

export const createSessionNote = createAsyncThunk('sessionNote/create', async (noteData, thunkAPI) => {
    try {
        const response = await axios.post('/api/session-notes', noteData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchSessionNotes = createAsyncThunk('sessionNote/fetch', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/session-notes');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const sessionNoteSlice = createSlice({
    name: 'sessionNote',
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
