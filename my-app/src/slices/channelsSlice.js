/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const initialState = {
  channels: [],
  currentChannelId: defaultChannelId,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    channelsInitialState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      const newChannels = state.channels.filter((channel) => channel.id !== id);
      state.channels = newChannels;
      state.currentChannelId = defaultChannelId;
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find((channelInfo) => channelInfo.id === id);
      channel.name = name;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
