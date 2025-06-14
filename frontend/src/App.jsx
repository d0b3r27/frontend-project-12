import { Routes, Route } from 'react-router-dom';
import Page404 from './pages/page404.jsx';
import SigninPage from './pages/signinPage.jsx';
import ChatPage from './pages/chatPage.jsx';
import SingupPage from './pages/signupPage.jsx';
import useSocketEvents from './utils/socket.js';
import ModalWindow from './modals/modalWindow.jsx';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


const App = () => {

  useSocketEvents();

  return (
    <>
      <Routes>
        <Route path="/" element={(<PrivateRoute><ChatPage /></PrivateRoute>)}/>
        <Route path="/login" element={<SigninPage />}/>
        <Route path='/signup' element={<SingupPage />}/>  
        <Route path="*" element={<Page404 />}/>
      </Routes>
      <ModalWindow/>
    </>
  );
};

export default App;
