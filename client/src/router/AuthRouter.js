import React from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

export const AuthRouter = () => {
  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='wrap-login100 p-t-50 p-b-90'>
          <Routes>
            <Route exact path="login" element={<LoginPage/>} />
            <Route exact path="register" element={<RegisterPage/>} />
            <Route path="/*" element={<Navigate to='login' replace/>} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
