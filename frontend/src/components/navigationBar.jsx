import { useDispatch } from 'react-redux';
import { logout } from "../slices/authSlice";
import { useNavigate } from 'react-router-dom';

const NavBar = ({ isAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {isAuth && (<button type="button" onClick={logoutHandler} className="btn btn-primary">Выйти</button>)}
      </div>
    </nav>
  )
};

export default NavBar;