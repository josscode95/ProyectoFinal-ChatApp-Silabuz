import React from 'react'
import { useContext } from 'react'
import { scrollToBottom } from '../helpers/fnScrollBottom'
import { ChatContext } from '../context/chat/ChatContext'
import { fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'

export const SidebarChatItem = ({ user }) => {

  const { chatState, dispatch } = useContext( ChatContext )
  const { chatActivo } = chatState;

  const onClick = async() => {
    dispatch({
      type: types.activarChat,
      payload: user.uid
    })
    //cargar los mensajes del chat
    const resp = await fetchConToken(`mensajes/${ user.uid }`)
    dispatch({
      type: types.cargarMensajes,
      payload: resp.mensajes
    })
    scrollToBottom('mensajes')
  }

  return (
    <div 
      className={`chatItem ${ (user.uid === chatActivo) && 'active_chat' }`}
      onClick={ onClick }
    >
      <img src="https://ptetutorials.com/images/user-profile.png" alt="user_img" />
      <div className='chatItem-user'>
        <h5>{ user.nombre }</h5>
        {
          (user.online)
            ? <span className='text-success'>Online</span> 
            : <span className='text-danger'>Offline</span>
        }
      </div>
    </div>
  )
}