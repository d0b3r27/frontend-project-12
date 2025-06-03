import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';
import urls from '../slices/serverUrls';
import { login } from '../slices/authSlice';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Обязательно поле')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
    password: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Минимум 6 символов'),
    confirmPassword: Yup.string()
      .required('Обязательное поле')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Formik
    initialValues={{
      username: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      const { username, password } = values;
      setStatus(null);
      try {
        const response = await axios.post(urls.singup, ({ username, password }));
        dispatch(login(response.data));
        navigate('/')
      } catch (error) {
        if (error.response?.status === 409) {
            setStatus('Такой пользователь уже существует');
        } else {
            setStatus('Ошибка при регистрации. Попробуйте позже.');
          }
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }}
    >
      {({ errors, touched, isSubmitting, status }) => (
        <Form className='w-50'>
          <h1 className='text-center mb-4'>Регистрация</h1>
          <div className='form-floating mb-3'>
            <Field
              id='username'
              name='username'
              className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
              placeholder='username'
              autoComplete='username'
              ref={usernameRef}
            />
            <label className='form-label' htmlFor='username'>Имя пользователя</label>
            <ErrorMessage name="username" component="div" className="invalid-feedback"/>
          </div>
          <div className='form-floating mb-3'>
            <Field
              id='password'
              name='password'
              type='password'
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
              placeholder='password'
              autoComplete='password'
            />
            <label className='form-label' htmlFor='password'>Пароль</label>
            <ErrorMessage name="password" component="div" className="invalid-feedback"/>
          </div>
          <div className='form-floating mb-3'>
            <Field
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder='confirmPassword'
              autoComplete='confirmPassword'
            />
            <label className='form-label' htmlFor='confirmPassword'>Подтвердите пароль</label>
            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback"/>
            {status && <div className="mt-1 text-center rounded bg-danger text-white">{status}</div>}
          </div>
          <button className='w-100 btn btn-outline-primary' disabled={isSubmitting} type='submit'>Зарегистрироваться</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;