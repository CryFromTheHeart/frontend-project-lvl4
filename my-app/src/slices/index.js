/* eslint-disable no-param-reassign */
import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import modalSlice from './modalSlice';
import { actions as channelAction } from './channelsSlice';
import { actions as messagesAction } from './messagesSlice';
import { actions as modalAction } from './modalSlice';

export const actions = { ...channelAction, ...messagesAction, ...modalAction };

export default configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modalInfo: modalSlice,
  },
});
