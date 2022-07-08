import React from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { string, object } from 'yup';
import axios from 'axios';
import routes from '../routes';

const loginFormSchema = object({
  username: string().required('Required'),
  password: string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
});

const handleSubmitForm = async (values) => {
  values.preventDefault();
  console.log(values);
  const response = await axios.post(routes.loginPath(), {
    username: 'admin',
    password: 'admin',
  });
  console.log(response.data);
};

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    onSubmit: handleSubmitForm,
  });

  return (
    <Form onSubmit={handleSubmitForm} className='col-12 col-md-6 mt-3 mt-mb-0'>
      <h1 className='text-center mb-4'>Логин</h1>
      <Form.Group className='form-floating mb-3'>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          name='username'
          id='username'
          required
          autoComplete='username'
          placeholder='Имя пользователя'
        />
        <label htmlFor='username'>Имя пользователя</label>
      </Form.Group>
      <Form.Group className='form-floating mb-4'>
        <Form.Control
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
          name='password'
          id='password'
          required
          autoComplete='current-password'
          placeholder='Имя пользователя'
        />
        <Form.Label htmlFor='password'>Пароль</Form.Label>
      </Form.Group>
      <button type='submit'>Войти</button>
      <Button type='submit' variant='outline-primary' className='w-100 mb-3'>
        Войти
      </Button>
    </Form>
  );
};
