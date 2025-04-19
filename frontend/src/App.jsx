import { Routes, Route } from 'react-router-dom';
import Page404 from './pages/page404.jsx';
import LoginPage from './pages/loginPage.jsx';
import ChatPage from './pages/chatPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="*" element={<Page404 />}/>
    </Routes>
  );
};

export default App;
