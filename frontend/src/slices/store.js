import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './apiSlice.js';
import authReducer from './authSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;