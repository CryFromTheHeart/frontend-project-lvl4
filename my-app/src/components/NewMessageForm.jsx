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
  const inputRef = useRef();
  const { username } = user;

  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      console.log(response.status);
      return response.data;
    } else {
      throw new Error(123);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async ({ body }) => {
      console.log(body);
      const filterMessage = leoProfanity.clean(body);
      const message = {
        channelId: channel.id,
        body: filterMessage,
        username,
      };
      try {
        await sendMessage(message, apiResponseHandle);
        console.log(message);
        formik.resetForm();
      } catch (e) {}
      formik.setSubmitting(false);
      inputRef.current.focus();
    },
    validateOnBlur: false,
  });

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
        <Button variant='group-vertical' type='submit'>
          <ArrowRightSquare size={20} />
          <span className='visually-hidden'>Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};
