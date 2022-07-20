import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import { AuthContext } from '../context/AuthContext';

export const RegisterPage = () => {

  const { register } = useContext(AuthContext)

  const [ form, setForm ] = useState({
    nombre: '',
    email: '',
    password: '',
  })

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const onSubmit = async(ev) => {

    ev.preventDefault();
    
    const { email, password, nombre } = form;

    //llamar al backend
    const msg = await register(nombre, email, password);
    if(msg !== true){
      Swal.fire('Error', msg, 'error')
    }

  }
 
  const todoOk = () => {
    return ( form.email.length > 0 && form.password.length > 0 && form.nombre.length > 0)
      ? true
      : false
  }
  
  return (
    <form 
      className='flex-sb flex-w'
      onSubmit={ onSubmit }
    >
      <span className='mb-3'>
        Chat - Registro
      </span>
      <div className='mb-3'>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre" 
          value={ form.nombre }
          onChange={ onChange }
        />
        <span></span>
      </div>
      <div className='mb-3'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={ form.email }
          onChange={ onChange }
        />
        <span></span>
      </div>
      <div className='mb-3'>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={ form.password }
          onChange={ onChange } 
        />
        <span></span>
      </div>
      <div className='row mb-3'>
        <div className='col text-right'>
          <Link to="/auth/login" className='txt1'>
            Ya tienes cuenta?
          </Link>
        </div>
      </div>
      <div>
        <button
          type='submit'
          disabled={ !todoOk() }
        >
          Ingresar
        </button>
      </div>
    </form>
  )
}