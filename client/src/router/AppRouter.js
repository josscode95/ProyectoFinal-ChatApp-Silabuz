import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { DesktopPage } from '../pages/DesktopPage';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const { auth, verificarToken } = useContext( AuthContext )

  useEffect(() => {
    verificarToken()
  }, [verificarToken])

  if( auth.checking ){
    return <h1>Espere por favor</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={
          <PublicRoute isAuthenticated={ auth.logged }>
            <AuthRouter />
          </PublicRoute>}
        />
        <Route exact path="/" element={
          <PrivateRoute isAuthenticated={ auth.logged }>
            <DesktopPage />
          </PrivateRoute>}
        /> 
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  )

}
