import React, {  useCallback, useEffect, useMemo } from 'react';
import { createContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState([]);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token_admin')  ?  localStorage.getItem('token_admin') : '';
  const usernameStored = localStorage.getItem('username') ?  localStorage.getItem('username') : '';


  const handleLogout = useCallback(() => {
    if (localStorage.getItem('token_admin')) {
      localStorage.removeItem('token_admin');
      localStorage.removeItem("username");
      setIsAuthenticated(false);
      setUserId(null);
      setUserRole([]);
      setUsername('');
    }
    navigate('/');

  }, [navigate]);

  
  const isJWTinlocalStorage = useCallback(() => {
    if (!localStorage.getItem('token_admin')) {
      return false;
    } else {
      return true;
    }
  }, []);

  useEffect(() => {
    setIsAuthenticated(isJWTinlocalStorage());

    if( isAuthenticated ){
      let jwtDecoded  = jwt_decode(JSON.parse(token));
      setUserId(parseInt(jwtDecoded.username));
      setUserRole(jwtDecoded.roles);
      setUsername(usernameStored);
    }

  }, [isJWTinlocalStorage ,token,userId,isAuthenticated,usernameStored ]);


  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      userId,
      setUserId,
      userRole,
      setUserRole,
      username,
      setUsername,
      handleLogout,
    }),
    [isAuthenticated, userId, userRole , username ,handleLogout]
  );

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider} ;