import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/navigationBar";
import Channels from "../components/channels";
import Messages from "../components/messages";

const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <NavBar/>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            {<Channels/>}
            {<Messages/>}
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  )
};

export default ChatPage;