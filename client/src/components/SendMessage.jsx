import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { SocketContext } from '../context/SocketContext'

export const SendMessage = () => {

  const [ mensaje, setMensaje ] = useState('')
  const { socket } = useContext(SocketContext)
  const { auth } = useContext(AuthContext)
  const { chatState } = useContext( ChatContext )

  const onChange = ({target}) => {
    setMensaje(target.value);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if(mensaje.length === 0) return;
    setMensaje('');

    socket.emit('mensaje-personal', {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje
    })  

  }

  return (
    <form
      onSubmit={ onSubmit }
    >
      <div className='row'>
        <div className='col-sm-9'>
          <input
            type="text"
            placeholder='Mensaje'
            value={ mensaje }
            onChange={ onChange } 
          />
        </div>
        <div className='col-sm-3 text-center'>
          <button className='mt-3' type="button">
            enviar
          </button>
        </div>
      </div>
    </form>
  )
}
