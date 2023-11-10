import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AuthContext } from "../../contexts/AuthContextProvider";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, setUserRole, setUserId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let element = {
      "email": email,
      "password": password
    };

    try {
      const response = await axios.post('http://localhost:1234/api/login_check', element);
      if (response && response.data.token !== '' && response.data.token !== undefined ) {
        let jwtDecoded = jwtDecode(response.data.token);
        if (jwtDecoded.roles.includes('ROLE_ADMIN')) {
          localStorage.setItem("token_admin", JSON.stringify(response.data.token));
          setUserRole(jwtDecoded.roles);
          setUserId(parseInt(jwtDecoded.userId));
          setIsAuthenticated(true);
          navigate("/courses");
        } else {
          navigate("/access-denied"); 
        }
      } else {
        console.log("token login est vide");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1> Connexion </h1>

        <div className="input-container">
          <input type='text' 
            label= {"Email"}   
            value={email} 
            onChange={(e) => setEmail(e.target.value ,'email')} 
            id="email"
            placeholder={"Adresse email"} 
            required= {true}
          />
        </div>
        <div className="input-container">
          <input 
            label= {"Mot de passe"}   
            value={password} 
            type="password"
            onChange={(e) => setPassword(e.target.value)} 
            placeholder={"Mot de passe"} 
            required= {true}
          />
        </div>
        <button className="btn-login"type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
