import React from 'react'
import Sidebar from '../components/organims/Sidebar/Sidebar';
import "./Layout.scss";
import RoutesNavigation from '../routes/RoutesNavigation';
import Header from '../components/organims/Header/Header';

const Layout = () => {
  return (
    <div className="global-container">
        <Sidebar />
        <div className='main-content'>
            <nav>
              <Header />
            </nav>
            <main>
              <RoutesNavigation />
            </main>
        </div>
    </div>
  )
}

export default Layout ;
