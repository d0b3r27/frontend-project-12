import avatar from '../assets/avatar.jpg';
import LoginForm from '../components/loginForm';
import NavBar from "../components/navigationBar";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SigninPage = () => {

  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex flex-column h-100">
        <NavBar/>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={avatar} className="rounded-circle" alt="Войти"/>
                  </div>
                  <LoginForm/>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>{t('signin.noAccount')} </span> 
                    <Link to="/signup">{t('signin.signup')}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;