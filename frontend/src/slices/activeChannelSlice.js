import { createSlice, isAction } from "@reduxjs/toolkit"; 

const initialState = { id: null };

const activeChannel = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      const { id } = payload;
      state.id = id;
    },
  },
});

export const { setActiveChannel } = activeChannel.actions;
export default activeChannel.reducer;