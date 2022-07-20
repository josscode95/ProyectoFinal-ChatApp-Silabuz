import React from 'react'
import { useContext } from 'react';
import { SelectChat } from '../components/SelectChat';
import { InboxUser } from '../components/InboxUser';
import { Messages } from '../components/Messages';
import { ChatContext } from '../context/chat/ChatContext';

import '../css/styles-chat.css'

export const DesktopPage = () => {

  const { chatState } = useContext(ChatContext)

  return (
    <div>
      <div>
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