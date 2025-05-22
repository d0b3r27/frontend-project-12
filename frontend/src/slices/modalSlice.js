import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: '',
  isOpen: '',
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.modalType = payload;
      state.isOpen = true;
    },
    closeModal(state, { payload }) {
      state.modalType = null;
      state.isOpen = false;
    }
  }
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;