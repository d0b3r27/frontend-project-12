import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useLoginMutation } from '../slices/api';

const LoginForm = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={ async (values) => {
        const { username, password } = values;
        
        if (!username) {
          inputRef.current.focus();
          return;
        }
        if (!password) {
          passwordRef.current.focus();
          return;
        }
        try {
          const response = await login(values).unwrap();
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/');
        } catch (e) {
          inputRef.current.select();
        }
      }}
    >
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field 
              name="username" 
              autoComplete='username'
              placeholder="Ваш ник" 
              id="username" 
              className={`form-control ${error ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <Field 
              name="password" 
              autoComplete='password'
              placeholder="Пароль" 
              type="password" 
              id="password" 
              className={`form-control ${error ? 'is-invalid' : ''}`}
              innerRef={passwordRef}
            />
            <label className="form-label" htmlFor="password">Пароль</label>
            {error && (
              <div className="mt-1 text-center rounded bg-danger text-white">
                Неверные имя пользователя или пароль
              </div>
            )}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </Form>
    </Formik>
  )
};

export default LoginForm;