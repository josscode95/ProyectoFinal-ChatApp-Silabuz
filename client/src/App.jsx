import React from 'react'
import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/chat/ChatContext'
import { SocketProvider } from './context/SocketContext'

import moment from "moment";
import "moment/locale/es";
moment.locale('es');

const App = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
}

export default App;
