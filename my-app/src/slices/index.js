/* eslint-disable no-param-reassign */
import { configureStore } from '@reduxjs/toolkit';
import channelsSlice, { actions as channelAction } from './channelsSlice';
import messagesSlice, { actions as messagesAction } from './messagesSlice';
import modalSlice, { actions as modalAction } from './modalSlice';

export const actions = { ...channelAction, ...messagesAction, ...modalAction };

export default configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modalInfo: modalSlice,
  },
});
