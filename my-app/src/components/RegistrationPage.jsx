import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { useAuth } from '../hooks';
// import { useRollbar } from '@rollbar/react';

const RegistrationForm = () => {
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const { t } = useTranslation();
  // const rollbar = useRollbar();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required(t('formValidation.requiredFeild'))
        .min(3, t('formValidation.username.min'))
        .max(20, t('formValidation.username.max')),
      password: yup
        .string()
        .required(t('formValidation.requiredFeild'))
        .min(6, t('formValidation.password.min')),
      confirmPassword: yup
        .string()
        .required(t('formValidation.requiredFeild'))
        .oneOf([yup.ref('password')], t('formValidation.password.equal')),
    }),
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      const { username, password } = values;

      try {
        const response = await axios.post(routes.signupApiPath(), {
          username,
          password,
        });
        auth.logIn(response.data);
        navigate(routes.mainPagePath());
      } catch (err) {
        // rollbar.error(err);
        if (err.response.status === 409) {
          setRegistrationFailed(true);
        } else {
          console.error(err);
        }
      }
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
    >
      <h1 className="text-center mb-4">{t('registrationForm.header')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          name="username"
          id="username"
          isInvalid={
            (formik.errors.username && formik.touched.username) ||
            registrationFailed
          }
          autoComplete="username"
          placeholder={t('registrationForm.labelUsername')}
        />
        <Form.Label htmlFor="username">
          {t('registrationForm.labelUsername')}
        </Form.Label>
        {formik.errors.username && formik.touched.username && (
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.username}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          name="password"
          id="password"
          isInvalid={
            (formik.errors.password && formik.touched.password) ||
            registrationFailed
          }
          autoComplete="current-password"
          placeholder={t('registrationForm.labelPassword')}
        />
        <Form.Label htmlFor="password">
          {t('registrationForm.labelPassword')}
        </Form.Label>
        {formik.errors.password && formik.touched.password && (
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          isInvalid={
            (formik.errors.confirmPassword && formik.touched.confirmPassword) ||
            registrationFailed
          }
          autoComplete="current-confirmPassword"
          placeholder={t('registrationForm.labelConfirmPassword')}
        />
        <Form.Label htmlFor="confirmPassword">
          {t('registrationForm.labelConfirmPassword')}
        </Form.Label>
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        )}
        {registrationFailed && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('formValidation.username.exist')}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('registrationForm.submitButton')}
      </Button>
    </Form>
  );
};

export const RegistrationPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
