import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import urls from '../slices/serverUrls';
import { login } from '../slices/authSlice';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const [signupError, setSignupError] = useState();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('yup.required'))
      .min(3, t('yup.min3Max20'))
      .max(20, t('yup.min3Max20')),
    password: Yup.string()
      .required(t('yup.required'))
      .min(6, t('yup.min6')),
    confirmPassword: Yup.string()
      .required(t('yup.required'))
      .oneOf([Yup.ref('password'), null], t('yup.passwordConfirm')),
  });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { username, password } = values;
        if (!username) {
          usernameRef.current.focus();
          return;
        }

        try {
          const response = await axios.post(urls.singup, ({ username, password }));
          dispatch(login(response.data));
        } catch (error) {
          if (error.response?.status === 409) {
            setSignupError(t('errors.signup.userAlreadyExist'));
          } else {
            setSignupError(t('errors.signup.registrationError'));
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signup.signup')}</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="username"
              autoComplete="username"
              innerRef={usernameRef}
            />
            <label className="form-label" htmlFor="username">{t('signup.username')}</label>
            <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-floating mb-3">
            <Field
              id="password"
              name="password"
              type="password"
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
              placeholder="password"
              autoComplete="password"
            />
            <label className="form-label" htmlFor="password">{t('signup.password')}</label>
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <div className="form-floating mb-3">
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="confirmPassword"
              autoComplete="confirmPassword"
            />
            <label className="form-label" htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
            {signupError && <div className="mt-1 text-center rounded bg-danger text-white">{signupError}</div>}
          </div>
          <button
            className="w-100 btn btn-outline-primary"
            disabled={isSubmitting}
            type="submit"
          >
            {t('signup.registration')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
