import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import image404 from '../assets/image404.svg';
import NavBar from '../components/navigationBar';

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column vh-100">
      <NavBar />
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3">
        <img alt={t('notFound.header')} className="img-fluid" style={{ maxHeight: '25vh' }} src={image404} />
        <h1 className="h4 text-muted mt-3">{t('notFound.header')}</h1>
        <p className="text-muted">
          {t('notFound.message')}
          {' '}
          <Link to="/">{t('notFound.home')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Page404;
