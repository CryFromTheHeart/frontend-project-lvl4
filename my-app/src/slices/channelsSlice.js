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
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      const newChannels = state.channels.filter((channel) => channel.id !== id);
      state.channels = newChannels;
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find(
        (channelInfo) => channelInfo.id === id
      );
      channel.name = name;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = defaultChannelId;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
