import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import resources from './locales';
import App from './App';
import AuthProvider from './providers/AuthProviders';
import store, { actions } from './slices/index';
import { WebSocketsContext } from './contexts';

/* import { Provider as RollbarProvider } from '@rollbar/react';
const rollbarConfig = {
  accessToken: '0ce6dec88b07487a9e7b017ddfd984f6',
  captureUncaught: true,
  captureUnhandledRejections: true,

  payload: {
    environment: 'production',
  },
} */

const init = async () => {
  const socket = io();

  leoProfanity.loadDictionary('ru');

  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: 'ru',
    resources,
  });

  /* const actionsWithSocket = {
    sendMessage: (message) =>
      socket.emit('newMessage', message, (response) => response.data),
    addChannel: (channel) => socket.emit('newChannel', channel),
    removeChannel: (channel) => socket.emit('removeChannel', channel),
    renameChannel: (channel) => socket.emit('renameChannel', channel),
  };
 */

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.messagesAddOne(payload));
    // payload { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
    // { id: 6, name: "new channel", removable: true }
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel(payload));
    // { id: 6 };
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel(payload));
    // { id: 7, name: "new name channel", removable: true }
  });

  const actionsWithSocket = {
    sendMessage: (message) => socket.emit('newMessage', message),
    addChannel: (channel) =>
      new Promise((resolve, reject) => {
        socket.emit('newChannel', channel, (res) => {
          if (res.status === 'ok') {
            resolve(res.data);
          }
          reject();
        });
      }),
    removeChannel: (channel) =>
      socket.emit('removeChannel', channel, (res) => {
        if (res.status === 'ok') {
          store.dispatch(actions.setDefaultChannel());
        }
      }),
    renameChannel: (channel) => socket.emit('renameChannel', channel),
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <WebSocketsContext.Provider value={actionsWithSocket}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WebSocketsContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};
export default init;
