import React from 'react'
import { useContext } from 'react';
import { SelectChat } from '../components/SelectChat';
import { InboxUser } from '../components/InboxUser';
import { Messages } from '../components/Messages';
import { ChatContext } from '../context/chat/ChatContext';


export const DesktopPage = () => {

  const { chatState } = useContext(ChatContext)

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <InboxUser />
        {
          ( chatState.chatActivo )
            ? <Messages />
            : <SelectChat />
        }
      </div>
    </div>
  )
}