import { Routes, Route } from 'react-router-dom';
import Page404 from './pages/page404.jsx';
import LoginPage from './pages/loginPage.jsx';
import ChatPage from './pages/chatPage.jsx';
import useSocketEvents from './socket.js';
import ModalWindow from './modals/modalWindow.jsx';

const App = () => {

  useSocketEvents();

  return (
    <>
      <Routes>
        <Route path="/" element={<ChatPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
      <ModalWindow/>
    </>
  );
};

export default App;
