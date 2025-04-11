import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './pages/page404.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={loginPage}/>
        <Route path="/login" element={loginPage}/> */}
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App
