import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './Sidebar.css';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Logo from '../../assets/svg/Logo';

const Sidebar = () => {
  const {isAuthenticated,handleLogout} = useContext(AuthContext);
  return (
    <div className="sidebar">
      <ul className="ul-sidebar">
            <li className="li-sidebar-logo"> 
                <Link className="a-sidebar" to="/courses"><Logo/></Link>
            </li> 

            <li className="li-sidebar">
                <Link className="a-sidebar" to="/instruments">Instruments</Link>
            </li>

            <li className="li-sidebar">
                <Link className="a-sidebar" to="/categories">Categories</Link>
            </li>

            <li className="li-sidebar">
                <Link className="a-sidebar" to="/composers">Compositeurs</Link>
            </li>

            <li className="li-sidebar">
                <Link className="a-sidebar" to="/courses">Cours</Link>
            </li>

            <li className="li-sidebar">
                <Link className="a-sidebar" to="/topics">Forum</Link>
            </li>

            {(isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && (
              <li className="li-sidebar-button">
                <button className='btn-logout' to="/" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li> 
            )}
      </ul>
    </div>
  );
};

export default Sidebar;
