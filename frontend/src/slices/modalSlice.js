import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: '',
  channelId: '',
  isOpen: false,
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addChannelModal(state, { payload }) {
      state.modalType = 'addChannel';
      state.channelId = null;
      state.isOpen = true;
    },
    editChannelModal(state, { payload }) {
      state.modalType = 'editChannel';
      state.channelId = payload;
      state.isOpen = true;
    },
    removeChannelModal(state, { payload }) {
      state.modalType = 'removeChannel';
      state.channelId = payload;
      state.isOpen = true;
    },
    closeModalStart(state) {
      state.isOpen = false;
    },
    closeModalFinish(state) {
      state.modalType = null;
      state.channelId = null;
    }
  }
});

export const { addChannelModal, editChannelModal, removeChannelModal, closeModalStart, closeModalFinish } = modal.actions;
export default modal.reducer;