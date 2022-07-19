import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewMessageForm from './NewMessageForm';
import { getCurrentChannel, getMessagesForCurrentChannel } from '../selectors';

const Message = ({ body, username }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const ChatBox = () => {
  const currentChannel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForCurrentChannel);
  const boxRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0 fw-bold">
          #
          {' '}
          {currentChannel.name}
        </p>
        <span className="text-muted">
          {t('messages.messageCount.count', { count: messages.length })}
        </span>
      </div>
      <div
        ref={boxRef}
        id="messages-box"
        className="chat-messages overflow-auto px-5 "
      >
        {messages.map(({ id, body, username }) => (
          <Message key={id} body={body} username={username} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={currentChannel} />
      </div>
    </div>
  );
};

export default ChatBox;
