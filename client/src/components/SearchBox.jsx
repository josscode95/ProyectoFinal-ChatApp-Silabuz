import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const SearchBox = () => {

  const { auth, logout } = useContext( AuthContext )

  return (
    <div>
      <div className='mt-2'>
        <h4>{ auth.name }</h4>
      </div>
      <div>
        <div>
          <button 
            className='btn text-danger'
            onClick={ logout }
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}
