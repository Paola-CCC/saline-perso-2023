import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';


const PrivateRoute = () => {

  if (!localStorage.getItem("token_admin")) {
    return <Navigate to='/login' replace={true} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
