import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessage } from './SendMessage'

export const Messages = () => {

  const { chatState } = useContext( ChatContext )
  const { auth } = useContext( AuthContext )

  return (
    <div className='messages'>
      <div 
        id="mensajes"
        className='msg_history'
      >
        {
          chatState.mensajes.map(msg => (
            ( msg.para === auth.uid )
              ? <IncomingMessage 
                  key={ msg.uid }
                  msg={ msg }
                /> //si el id ingresado es igual al id al que se va enviar- es porque estoy recibiendo
              : <OutgoingMessage key={msg.uid} msg={ msg }/>
          ))
        }
      </div>
      <SendMessage />
    </div>
  )
} 