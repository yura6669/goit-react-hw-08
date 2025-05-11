import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const contactAPI = axios.create({
    baseURL: 'https://connections-api.goit.global',
});

const setAuthHeader = token => { 
    contactAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const clearAuthHeader = () => { 
    contactAPI.defaults.headers.common.Authorization = '';
}

export const register = createAsyncThunk('auth/register', async (body, { rejectWithValue }) => {
    try { 
        const response = await contactAPI.post('users/signup', body);
        setAuthHeader(response.data.token);
        return response.data;
    } catch(error) {
        return rejectWithValue(error.message);
    }
});

export const login = createAsyncThunk('auth/login', async (body, { rejectWithValue }) => { 
    try { 
        const response = await contactAPI.post('users/login', body);
        setAuthHeader(response.data.token);
        return response.data;
    } catch(error) {
        return rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => { 
    try { 
        await contactAPI.post('users/logout');
        clearAuthHeader();
    } catch(error) {
        return rejectWithValue(error.message);
    }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, { getState, rejectWithValue }) => {
    try {
        const savedToken = getState().auth.token;
        if (!savedToken) {
            return rejectWithValue('Unable to fetch user');
        }
        setAuthHeader(savedToken);
        const response = await contactAPI.get('users/current');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
 });