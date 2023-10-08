import React from 'react'
import Sidebar from '../components/organims/Sidebar/Sidebar';
import "./Layout.scss";
import RoutesNavigation from '../routes/RoutesNavigation';

const Layout = () => {
  return (
    <div className="global-container">
        <Sidebar />
        <main>
           <RoutesNavigation />
        </main>
    </div>
  )
}

export default Layout ;
