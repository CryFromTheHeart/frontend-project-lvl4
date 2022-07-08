import React from 'react';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  return (
    <div className='d-flex flex-column h-100'>
      <div className='container-fluid h-100'>
        <div className='row justify-content-center align-content-center h-100'>
          <div className='col-12 col-md-8 col-xxl-6'>
            <div className='card shadow-sm'>
              <div className='card-body row p-5'>
                <LoginForm />
              </div>
              <div className='card-footer p-4'>
                <div className='text-center'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
