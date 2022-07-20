import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
import { AuthContext } from '../context/AuthContext'

export const LoginPage = () => {

  const { login } = useContext(AuthContext)

  const [ form, setForm ] = useState({
    email: 'test@test.com',
    password: '12345',
    rememberme: false
  })

  useEffect(() => {
     const remembermeEmail = localStorage.getItem('email')
     if( remembermeEmail ){
      setForm(form => ({
        ...form,
        rememberme: true,
        email: remembermeEmail
      }))
     }
  }, [])
  
  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme
    })
  }

  const onSubmit = async(ev) => {

    ev.preventDefault();

    (form.rememberme)
      ? localStorage.setItem('email', form.email)
      : localStorage.removeItem('email')
    
    const { email, password } = form;

    //llamar al backend
    console.log(email, password)
    const ok = await login(email, password);
    if(!ok){
      Swal.fire('Error', 'Verifique el usuario y contraseña', 'error')
    }

  }
 
  const todoOk = () => {
    return ( form.email.length > 0 && form.password.length > 0)
      ? true
      : false
  }
  
  return (
    <form 
      className='container-form'
      onSubmit={ onSubmit }
    >
      <span className='container-form__title'>
        Chat - Ingreso
      </span>
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
      <div className='container-form__other'>
        <div 
          className='other-check'
          onClick={ () => toggleCheck() }
        >
          <input
            id='ckb1'
            type="checkbox"
            name="rememberme" 
            checked={ form.rememberme }
            readOnly
          />
          <label>
            Recordarme
          </label>
        </div>
        <div className='other-txt-container'>
          <Link 
            to="/auth/register" 
            className='other-text'
          >
            No tienes cuenta?
          </Link>   
        </div>
      </div>
      <div className='container-form__button'>
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