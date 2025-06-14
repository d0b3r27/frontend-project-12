import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice.js';
import axios from 'axios';
import urls from '../slices/serverUrls.js';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const loginRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const { t } = useTranslation();

  useEffect(() => {
    loginRef.current.focus();
  }, []);
  
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={ async (values, { setSubmitting }) => {
        const { username, password } = values;
        setAuthError(null);
        
        if (!username) {
          loginRef.current.focus();
          return;
        }
        if (!password) {
          passwordRef.current.focus();
          return;
        }

        try {
          const response = await axios.post(urls.login, values);
          dispatch(login(response.data));
        } catch (error) {
          if (error.response?.status === 401) {
            setAuthError(t('errors.signin.wrongLogPas'));
          } else {
              setAuthError(t('errors.signin.signinError'));
            }
          console.log(e);
          loginRef.current.select();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t('signin.login')}</h1>
          <div className="form-floating mb-3">
            <Field 
              name="username" 
              autoComplete='username'
              placeholder="Ваш ник" 
              id="username" 
              className={`form-control ${authError ? 'is-invalid' : ''}`}
              innerRef={loginRef}
            />
            <label htmlFor="username">{t('signin.username')}</label>
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
            <label className="form-label" htmlFor="password">{t('signin.password')}</label>
            {authError && (
              <div className="mt-1 text-center rounded bg-danger text-white">
                {authError}
              </div>
            )}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting || isAuth}>{t('signin.login')}</button>
        </Form>
      )}
    </Formik>
  )
};

export default LoginForm;