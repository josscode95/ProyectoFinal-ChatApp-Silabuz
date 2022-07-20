import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const SearchBox = () => {

  const { auth, logout } = useContext( AuthContext )

  return (
    <div className='boxUser'>
      <h4>{ auth.name }</h4>
      <button 
        onClick={ logout }
      >
        Salir
      </button>
    </div>
  )
}
