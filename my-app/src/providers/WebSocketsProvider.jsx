import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WebSocketsContext } from '../contexts';

import { actions } from '../slices';


const WebSocketsProvider = ({ children, socket }) => {
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

export default WebSocketsContext;
