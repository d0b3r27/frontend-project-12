import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: 'general', id: '1' };

const activeChannel = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel(state, {payload}) {
      const { name, id } = payload;
      state.name = name;
      state.id = id;
    },
  },
});

export const { setActiveChannel } = activeChannel.actions;
export default activeChannel.reducer;