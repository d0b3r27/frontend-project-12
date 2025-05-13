import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './apiSlice.js';
import authReducer from './authSlice.js';
import activeChannelReducer from './activeChannelSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    activeChannel: activeChannelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;