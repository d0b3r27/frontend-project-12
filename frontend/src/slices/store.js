import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './apiSlice.js';
import userReducer from './userSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;