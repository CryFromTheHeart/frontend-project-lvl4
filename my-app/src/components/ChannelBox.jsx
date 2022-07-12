import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getChannelsInfo } from '../selectors';
import Channel from './Channel';
import { actions } from '../slices';

const ChannelBox = () => {
  const { channels, currentChannelId } = useSelector(getChannelsInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenAddChannelModal = () => {
    dispatch(actions.openModal({ type: 'add' }));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.header')}</span>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleOpenAddChannelModal}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            current={currentChannelId}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelBox;
