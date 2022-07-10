import React from 'react';

import { WebSocketsContext } from '../contexts';
import { useDispatch } from 'react-redux';
import { actions } from '../slices';
import { useEffect } from 'react';

export const WebSocketsProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const actionsWithSocket = {
    sendMessage: (message) => socket.emit('newMessage', message),
  };

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(actions.messagesAddOne({ message: payload }));
    });
  }, [dispatch, socket]);

  return (
    <WebSocketsContext.Provider value={actionsWithSocket}>
      {children}
    </WebSocketsContext.Provider>
  );
};
