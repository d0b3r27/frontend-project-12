import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      return payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;