import React from 'react'
import Sidebar from '../components/organims/Sidebar/Sidebar';
import "./Layout.scss";
import Header from '../components/organims/Header/Header';
import MainContent from '../components/organims/MainContent/MainContent';

const Layout = () => {
  return (
    <div className="global-container">
        <Sidebar />
        <div className='main-content'>
            <nav>
              <Header />
            </nav>
            <MainContent/>
        </div>
    </div>
  )
}

export default Layout ;
