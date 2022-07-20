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
      className='container-form__register'
      onSubmit={ onSubmit }
    >
      <span className='container-form__title'>
        Chat - Registro
      </span>
      <div className='container-form__input'>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre" 
          value={ form.nombre }
          onChange={ onChange }
        />
        <span></span>
      </div>
      <div className='container-form__input'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={ form.email }
          onChange={ onChange }
        />
        <span></span>
      </div>
      <div className='container-form__input'>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={ form.password }
          onChange={ onChange } 
        />
        <span></span>
      </div>
      <div className='other-txt-container'>
        <Link to="/auth/login" className='other-text'>
          Ya tienes cuenta?
        </Link>
      </div>
      <div className='container-form__button'>
        <button
          type='submit'
          disabled={ !todoOk() }
        >
          Registrar
        </button>
      </div>
    </form>
  )
}