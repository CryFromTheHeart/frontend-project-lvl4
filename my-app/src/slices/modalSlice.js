/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { show: false, type: null, extra: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.show = true;
      state.type = type;
      state.extra = extra ?? null;
    },
    closeModal: (state) => {
      state.show = false;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
