import React, { FC, useContext, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MenuIcons from '../../atoms/MenuIcons/MenuIcons';
import { useEffectsContext } from '../../../contexts/EffectsContext';
import { useAuthContext } from '../../../contexts/AuthContext';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {

  // const {isAuthenticated,handleLogout,userRole ,username} = useContext(AuthContext);
const [ subnavbarIsOpen, setSubnavbarIsOpen ] = useState(true);
const { canOpenSidebar} = useEffectsContext();
const { username, isAuthenticated } = useAuthContext();


  const getFirstLetters = (value :any) => {
    let username = value;
    let usernameStrimed = username.trim();
    username = usernameStrimed.split(' ');
    let firstname = Array.from(username[0])[0];
    let lastname = Array.from(username[username.length - 1])[0];
    return firstname + '' + lastname ;
  }
  return (
  <div className="Header" data-testid="Header">
    <MenuIcons variant='open' handleClick={canOpenSidebar}/>

    <div className='user-wrapper'>
      <button onClick={() => setSubnavbarIsOpen(!subnavbarIsOpen)} tabIndex={0}>
        <Link to="#" className='gestion' >
          <FontAwesomeIcon icon={faUser} /> 
          <span id="username" className='desktop'> {username && username !== undefined ? username : '' }    </span>   
          <span id="username" className='smartphone'> {username && username !== undefined ? getFirstLetters(username) : ''  }    </span>
          <span className={`chevron ${ subnavbarIsOpen ? 'open' : ''}`} ></span>
        </Link>
      </button>

      <ul className={`sub-menu ${ subnavbarIsOpen ? 'open' : ''}`}  tabIndex={0} >
                  <li >
                    <Link to="/espace-personnel"> Espace personnel  </Link> 
                  </li>
            
                <li>
                  <Link to="/messagerie">Messagerie</Link>
                </li>
                

                <li>
                  <Link to="/" >
                  Se déconnecter
                  </Link>
                </li> 

                
      </ul>
    </div>
  </div>
)};

export default Header;
