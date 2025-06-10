import image404 from '../assets/image404.svg';
import NavBar from "../components/navigationBar";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Page404 = () => {

  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex flex-column h-100">
        <NavBar/>
        <div className="text-center">
          <img alt="Страница не найдена" className="img-fluid h-25" src={image404}/>
          <h1 className="h4 text-muted">{t('notFound.header')}</h1>
          <p className="text-muted">{t('notFound.message')} <Link to="/">{t('notFound.home')}</Link></p>
        </div>
      </div>
    </>
  );
};

export default Page404;