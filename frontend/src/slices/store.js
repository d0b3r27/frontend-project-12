import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './apiSlice.js';
import usersReducer from './usersSlice.js'

const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;