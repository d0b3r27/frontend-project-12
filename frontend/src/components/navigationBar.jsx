import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../slices/authSlice";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const { t, i18n } = useTranslation();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };
  const languageSwitchHandler = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        <div className="d-flex align-items-center gap-5">
          <button onClick={languageSwitchHandler} className="btn btn-outline-secondary btn-sm">
            {i18n.language === 'ru' ? 'EN' : 'RU'}
          </button>
          {isAuth && (
            <button type="button" onClick={logoutHandler} className="btn btn-primary">
              {t('nav.logout')}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;