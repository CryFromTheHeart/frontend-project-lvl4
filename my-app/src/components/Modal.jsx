import React, { useEffect, useRef } from 'react';
import { Modal as BootstrapModal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelById, getChannelNames, getModalInfo } from '../selectors';
import { actions } from '../slices';
import { useFormik } from 'formik';
import { useWebSockets } from '../hooks';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

const AddChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();
  const channelNames = useSelector(getChannelNames);
  const { addChannel } = useWebSockets();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('formValidation.requiredFeild'))
      .min(3, t('formValidation.username.min'))
      .max(20, t('formValidation.username.max'))
      .notOneOf(channelNames, t('formValidation.existChannelName')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async ({ name }) => {
      const filterName = leoProfanity.clean(name);
      try {
        await addChannel({ name: filterName });
        toast.success(t('notifications.addChannel'));
      } catch (e) {
        console.error(e);
      }
      handleClose();
    },
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {t('modals.addChannel.header')}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='input'
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
              disabled={formik.isSubmitting}
              name='name'
              id='name'
              autoFocus
            />
            <Form.Label className='visually-hidden' htmlFor='name'>
              {t('modals.addChannel.label')}
            </Form.Label>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' onClick={handleClose}>
              {t('modals.cancelButton')}
            </Button>
            <Button variant='primary' type='submit'>
              {t('modals.submitButton')}
            </Button>
          </div>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const RemoveChannelModal = ({ handleClose }) => {
  const { extra } = useSelector(getModalInfo);
  const { removeChannel } = useWebSockets();
  const { t } = useTranslation();

  const handleDeleteClick = async () => {
    try {
      await removeChannel({ id: extra });
      toast.success(t('notifications.removeChannel'));
    } catch (e) {}
    handleClose();
  };

  return (
    <>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {t('modals.removeChannel.header')}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {t('modals.removeChannel.body')}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          {t('modals.cancelButton')}
        </Button>
        <Button variant='danger' onClick={handleDeleteClick}>
          {t('modals.removeChannel.deleteButton')}
        </Button>
      </BootstrapModal.Footer>
    </>
  );
};

const RenameChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();
  const channelNames = useSelector(getChannelNames);
  const { renameChannel } = useWebSockets();
  const { extra } = useSelector(getModalInfo);
  const currentChannel = useSelector(getChannelById(extra));

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('formValidation.requiredFeild'))
      .min(3, t('formValidation.username.min'))
      .max(20, t('formValidation.username.max'))
      .notOneOf(channelNames, t('formValidation.existChannelName')),
  });

  const formik = useFormik({
    initialValues: { name: currentChannel.name },
    validationSchema,
    onSubmit: async ({ name }, { setSubmitting }) => {
      const filterName = leoProfanity.clean(name);
      try {
        await renameChannel({ id: currentChannel.id, name: filterName });
        toast.success(t('notifications.renameChannel'));
      } catch (e) {
        console.error(e);
        setSubmitting(false);
      }
      handleClose();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {t('modals.renameChannel.header')}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='input'
              ref={inputRef}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
              disabled={formik.isSubmitting}
              name='name'
              id='name'
            />
            <Form.Label className='visually-hidden' htmlFor='name'>
              {t('modals.renameChannel.labelChannelName')}
            </Form.Label>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' onClick={handleClose}>
              {t('modals.cancelButton')}
            </Button>
            <Button
              variant='primary'
              type='submit'
              disabled={formik.isSubmitting}
            >
              {t('modals.submitButton')}
            </Button>
          </div>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const modals = {
  add: AddChannelModal,
  rem: RemoveChannelModal,
  rename: RenameChannelModal,
};

const Modal = () => {
  const { show, type } = useSelector(getModalInfo);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  const Component = modals[type];

  return (
    <BootstrapModal show={show} onHide={handleClose} centered>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
