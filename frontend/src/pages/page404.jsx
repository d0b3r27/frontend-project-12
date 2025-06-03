import image404 from '../assets/image404.svg';

const Page404 = () => {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
          </div>
        </nav>
        <div className="text-center">
          <img alt="Страница не найдена" className="img-fluid h-25" src={image404}/>
          <h1 className="h4 text-muted">Страница не найдена</h1>
          <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
        </div>
      </div>
      <div className="Toastify"></div>
    </>
  );
};

export default Page404;