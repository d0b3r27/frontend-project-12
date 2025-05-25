import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalName: '',
  modalType: '',
  channelId: '',
  isOpen: false,
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addChannelModal(state, { payload }) {
      state.modalName = 'Добавить канал';
      state.modalType = 'addChannel';
      state.channelId = null;
      state.isOpen = true;
    },
    editChannelModal(state, { payload }) {
      state.modalName = 'Переименовать канал';
      state.modalType = 'editChannel';
      state.channelId = payload;
      state.isOpen = true;
    },
    removeChannelModal(state, { payload }) {
      state.modalName = 'Удалить канал';
      state.modalType = 'removeChannel';
      state.channelId = payload;
      state.isOpen = true;
    },
    closeModal(state, { payload }) {
      state.modalName = null;
      state.modalType = null;
      state.isOpen = false;
      state.id = null;
    }
  }
});

export const { addChannelModal, editChannelModal, removeChannelModal, closeModal } = modal.actions;
export default modal.reducer;