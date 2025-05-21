import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice.js';
import axios from 'axios';
import urls from '../slices/serverUrls.js';

const LoginForm = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState();
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

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
        setAuthError(false);
        
        if (!username) {
          inputRef.current.focus();
          return;
        }
        if (!password) {
          passwordRef.current.focus();
          return;
        }
        try {
          setIsLoading(true);
          const response = await axios.post(urls.login, values);
          dispatch(login(response.data));
          navigate('/');
        } catch (e) {
          setAuthError(true);
          console.log(e);
          inputRef.current.select();
        } finally {
          setIsLoading(false);
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
            className={`form-control ${authError ? 'is-invalid' : ''}`}
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
            className={`form-control ${authError ? 'is-invalid' : ''}`}
            innerRef={passwordRef}
          />
          <label className="form-label" htmlFor="password">Пароль</label>
          {authError && (
            <div className="mt-1 text-center rounded bg-danger text-white">
              Неверные имя пользователя или пароль
            </div>
          )}
        </div>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isLoading || isAuth}>Войти</button>
      </Form>
    </Formik>
  )
};

export default LoginForm;