import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { batch, useDispatch } from 'react-redux';
import { useAuth } from '../hooks';
import routes from '../routes';
import { actions } from '../slices';
import { ChannelBox } from './ChannelBox';
import { ChatBox } from './ChatBox';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const ChatPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      const res = await axios.get(routes.getDataPath(), {
        headers: auth.getHeaderAuth(),
      });

      const { messages, channels, currentChannelId } = res.data;

      batch(() => {
        dispatch(actions.channelsInitialState({ channels, currentChannelId }));
        dispatch(actions.messagesInitialState({ messages }));
      });

      if (res.data) {
        setLoaded(true);
      }
    };

    fetchData();
  }, [auth, dispatch]);

  return loaded ? (
    <>
      <div className='container h-100 my-4 overflow-hidden rounded shadow'>
        <div className='row h-100 bg-white flex-md-row'>
          <Modal />
          <div className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
            <ChannelBox />
          </div>
          <div className='col p-0 h-100'>
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <Spinner animation='border' role='status' variant='primary'>
        <span className='visually-hidden'>{t('chat.chatLoading')}</span>
      </Spinner>
    </div>
  );
};
