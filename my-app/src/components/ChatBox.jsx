import React from 'react';
import { NewMessageForm } from './NewMessageForm';
import { useSelector } from 'react-redux';
import { getCurrentChannel, getMessagesForCurrentChannel } from '../selectors';
import { useTranslation } from 'react-i18next';

const Message = ({ body, username }) => {
  return (
    <div className='text-break mb-2'>
      <b>{username}</b>
      {': '}
      {body}
    </div>
  );
};

export const ChatBox = () => {
  const currentChannel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForCurrentChannel);
  const { t } = useTranslation();

  return (
    <div className='d-flex flex-column h-100'>
      <div className='bg-light mb-4 p-3 shadow-sm small'>
        <p className='m-0 fw-bold'># {currentChannel.name}</p>
        <span className='text-muted'>
          {t('messages.messageCount.count', { count: messages.length })}
        </span>
      </div>
      <div id='messages-box' className='chat-messages overflow-auto px-5 '>
        {messages.map(({ id, body, username }) => (
          <Message key={id} body={body} username={username} />
        ))}
      </div>
      <div className='mt-auto px-5 py-3'>
        <NewMessageForm channel={currentChannel} />
      </div>
    </div>
  );
};
