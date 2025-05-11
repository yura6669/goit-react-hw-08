import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';

const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(logout.fulfilled, () => initialState)
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.pending, (state) => {
                state.error = null;
                state.isRefreshing = true;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            }).addMatcher(isAnyOf(register.pending, login.pending, logout.pending, refreshUser.pending), (state) => {
                state.error = null;
            }).addMatcher(isAnyOf(register.rejected, login.rejected, logout.rejected), (state) => {
                state.error = 'Something went wrong. Please try again later.';
            });
    }

});

export const authReducer = slice.reducer;