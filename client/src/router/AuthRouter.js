import React from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

import '../css/styles-login.css';

export const AuthRouter = () => {
  return (
    <div>
      <div>
        <div>
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
