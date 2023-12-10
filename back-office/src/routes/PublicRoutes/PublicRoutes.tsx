import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Login} from '../../components/pages';

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default PublicRoutes;
