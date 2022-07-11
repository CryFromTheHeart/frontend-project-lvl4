import { useFormik } from 'formik';
import React, { useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useEffect } from 'react';
import { useAuth, useWebSockets } from '../hooks';
import leoProfanity from 'leo-profanity';

const validationSchema = yup.object().shape({
  body: yup.string().trim(),
});

export const NewMessageForm = ({ channel }) => {
  const { user } = useAuth();
  const { sendMessage } = useWebSockets();

  const { username } = user;

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async ({ body }) => {
      const filterMessage = leoProfanity.clean(body);
      const message = {
        channelId: channel.id,
        body: filterMessage,
        username,
      };
      await sendMessage(message);
      formik.resetForm();
    },
  });

  const inputRef = useRef();

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      className='py-1 border rounded-2'
    >
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name='body'
          aria-label='Новое сообщение'
          disabled={formik.isSubmitting}
          placeholder='Введите сообщение...'
          className='border-0 p-0 ps-2'
        />
        <Button variant='group-vertical' type='submit' disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className='visually-hidden'>Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};
