import { Provider } from 'react-redux';
import App from './App';
import AuthProvider from './providers/AuthProviders';
import store, { actions } from './slices/index';
import { WebSocketsContext } from './contexts';

import { io } from 'socket.io-client';
import i18n from 'i18next';
import resources from './locales';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';

/* import { Provider as RollbarProvider } from '@rollbar/react'; // <-- Provider imports 'rollbar' for us

const rollbarConfig = {
  accessToken: '0ce6dec88b07487a9e7b017ddfd984f6',
  captureUncaught: true,
  captureUnhandledRejections: true,

  payload: {
    environment: 'production',
  },
}; */

const init = async () => {
  const socket = io('ws://localhost:3000');

  leoProfanity.loadDictionary('ru');

  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: 'ru',
    resources,
  });

  const withAcknowledgement =
    (socketFunc) =>
    (...args) =>
      new Promise((resolve, reject) => {
        let state = 'pending'; // eslint-disable-line
        const timer = setTimeout(() => {
          state = 'rejected';
          reject();
        }, 3000);

        socketFunc(...args, (response) => {
          if (state !== 'pending') return;

          clearTimeout(timer);

          if (response.status === 'ok') {
            state = 'resolved';
            resolve(response.data);
          }

          reject();
        });
      });

  const api = {
    sendMessage: withAcknowledgement((...args) =>
      socket.volatile.emit('newMessage', ...args)
    ),
    addChannel: withAcknowledgement((...args) =>
      socket.volatile.emit('newChannel', ...args)
    ),
    renameChannel: withAcknowledgement((...args) =>
      socket.volatile.emit('renameChannel', ...args)
    ),
    removeChannel: withAcknowledgement((...args) =>
      socket.volatile.emit('removeChannel', ...args)
    ),
  };

  const actionsWithSocket = {
    sendMessage: (message) => socket.volatile.emit('newMessage', message),
    addChannel: (channel) => socket.emit('newChannel', channel),
    removeChannel: (channel) => socket.emit('removeChannel', channel),
    renameChannel: (channel) => socket.emit('renameChannel', channel),
  };

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

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <WebSocketsContext.Provider value={api}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WebSocketsContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};
export default init;
