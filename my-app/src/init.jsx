import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider } from '@rollbar/react';
import resources from './locales';
import App from './App';
import AuthProvider from './providers/AuthProviders';
import store, { actions } from './slices/index';
import { WebSocketsContext } from './contexts';

const init = async () => {
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  const socket = io();

  leoProfanity.loadDictionary('ru');

  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: 'ru',
    resources,
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.messagesAddOne(payload));
    // payload { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
    // { id: 7, name: "name channel", removable: true }
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
    addChannel: (channel) => socket.emit('newChannel', channel, (response) => {
      store.dispatch(actions.setCurrentChannel(response.data.id));
    }),
    removeChannel: (channel) => socket.emit('removeChannel', channel, (res) => {
      if (res.status === 'ok') {
        store.dispatch(actions.setDefaultChannel());
      }
    }),
    renameChannel: (channel) => socket.emit('renameChannel', channel),
  };

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <I18nextProvider i18n={i18nInstance}>
          <WebSocketsContext.Provider value={actionsWithSocket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </WebSocketsContext.Provider>
        </I18nextProvider>
      </RollbarProvider>
    </Provider>
  );
};
export default init;
