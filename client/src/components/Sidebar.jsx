import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {

  const { chatState } = useContext( ChatContext )
  const { auth } = useContext( AuthContext )

  return (
    <div>
      {
        chatState.usuarios
          .filter(user => user.uid !== auth.uid)
          .map(user => (
            <SidebarChatItem 
              key={ user.uid } 
              user={ user }
            />
          ))
      }
      <div className='extra-espacio'></div>
    </div>
  )
}
