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
      <input
        type="text"
        placeholder='Mensaje'
        value={ mensaje }
        onChange={ onChange } 
      />
      <button type="submit">
        enviar
      </button>
    </form>
  )
}
