import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (state: { modal: ModalState }) =>
  state.modal.isOpen;

export default modalSlice.reducer;
