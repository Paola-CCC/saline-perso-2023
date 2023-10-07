import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import './Layout.css';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';

const Layout = () => {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <div className="container">
            <div className="sidebar-content">
                { isAuthenticated == true  ? (
                    <Sidebar />
                ) : null }
            </div>
            <div className="main-content">
                <Main />
            </div>
        </div>
    );
}

export default Layout;
