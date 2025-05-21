import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.name = payload;
    },
    closeModal(state, { payload }) {
      state.name = null;
    }
  }
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;