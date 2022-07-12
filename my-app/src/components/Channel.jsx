import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../slices';

export const Channel = ({ channel, current }) => {
  const { id, name } = channel;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRenameChannel = (id) => () => {
    dispatch(actions.openModal({ type: 'rename', extra: id }));
  };

  const handleRemoveChannel = (id) => () => {
    dispatch(actions.openModal({ type: 'rem', extra: id }));
  };

  const handleChangeChannel = () => {
    dispatch(actions.setCurrentChannel(id));
  };

  const variant = id === current ? 'secondary' : null;

  return (
    <li className='nav-item w-100'>
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className='d-flex'>
          <Button
            type='button'
            className='w-100 rounded-0 text-start text-truncate'
            variant={variant}
            onClick={handleChangeChannel}
          >
            <span className='me-1'>#</span>
            {name}
          </Button>

          <Dropdown.Toggle split id='dropdown-split' variant={variant}>
            <span className='visually-hidden'>{t('channels.channelsDr')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRenameChannel(id)}>
              {t('channels.dropDown.rename')}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleRemoveChannel(id)}>
              {t('channels.dropDown.delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type='button'
          className='w-100 rounded-0 text-start text-truncate'
          variant={variant}
          onClick={handleChangeChannel}
        >
          <span className='me-1'>#</span>
          {name}
        </Button>
      )}
    </li>
  );
};
