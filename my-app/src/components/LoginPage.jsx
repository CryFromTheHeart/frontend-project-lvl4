import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import routes from '../routes';
import { useAuth } from '../hooks';

export const LoginForm = () => {
  const auth = useAuth();
  const [isAuthFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        navigate(routes.mainPagePath());
      } catch (err) {
        rollbar.error(err);
        if (!err.isAxiosError) {
          toast.error(t('notifications.unknown'));
          return;
        }

        if (err.response.status === 401) {
          setAuthFailed(true);
        } else {
          toast.error(t('notifications.network'));
        }
      }
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
    >
      <h1 className="text-center mb-4">{t('loginForm.header')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          id="username"
          required
          isInvalid={isAuthFailed}
          autoComplete="username"
          placeholder={t('loginForm.labelUsername')}
        />
        <Form.Label htmlFor="username">
          {t('loginForm.labelUsername')}
        </Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          id="password"
          required
          isInvalid={isAuthFailed}
          autoComplete="current-password"
          placeholder={t('loginForm.labelPassword')}
        />
        <Form.Label htmlFor="password">
          {t('loginForm.labelPassword')}
        </Form.Label>
        {isAuthFailed && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('formValidation.loginError')}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('loginForm.submitButton')}
      </Button>
    </Form>
  );
};

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" />
                <LoginForm />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  {t('loginForm.description')}
                  {' '}
                  <Link to={routes.signupPath()}>{t('loginPage.regLink')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
