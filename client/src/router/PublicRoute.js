import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({isAuthenticated, children}) => {
  return isAuthenticated
    ? <Navigate to="/" replace/>
    : children
}
