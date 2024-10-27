// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true; // This should be set to true
      state.token = action.payload; // Store token
    },
    logout: (state) => {
      state.isAuthenticated = false; // Reset state on logout
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
