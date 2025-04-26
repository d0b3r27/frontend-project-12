import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      const { username, token } = payload;
      console.log(username, token);
      if (!state[username]) {
        state[username] = token;
      }
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;