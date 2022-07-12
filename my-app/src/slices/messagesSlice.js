/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as actionsIndex } from './channelsSlice';

const initialState = { messages: [] };

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesAddOne: (state, { payload }) => {
      state.messages.push(payload);
    },
    messagesInitialState: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionsIndex.removeChannel, (state, { payload }) => {
      const { id } = payload;
      const newMessages = state.messages.filter(
        (message) => message.channelId !== id,
      );
      state.messages = newMessages;
    });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
