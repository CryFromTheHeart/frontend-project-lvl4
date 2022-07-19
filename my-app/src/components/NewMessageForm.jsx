import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth, useWebSockets } from '../hooks';

const NewMessageForm = ({ channel }) => {
  const { user } = useAuth();
  const { sendMessage } = useWebSockets();
  const inputRef = useRef(null);
  const { username } = user;
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    body: yup.string().trim(),
  });

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
      try {
        await sendMessage(message);

        formik.resetForm();
      } catch (e) {
        toast.error(t('newMessagesForm.error'));
      }
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
      className="py-1 border rounded-2"
    >
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('newMessagesForm.placeholder')}
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">
            {t('newMessagesForm.submitButton')}
          </span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
