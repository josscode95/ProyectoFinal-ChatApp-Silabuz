
import React, { createContext, useReducer } from "react";
import { ChatReducer } from "./ChatReducer";

export const ChatContext = createContext();

const initialState = {
  uid: '',
  chatActivo: null, //uid del usuario al que yo quiero enviar mensajes
  usuarios: [], //usuarios de la bd
  mensajes: [], //chat seleccionado
}

export const ChatProvider = ({ children }) => {

  const [ chatState, dispatch ] = useReducer(ChatReducer, initialState)

  return (
    <ChatContext.Provider value={{
      chatState,
      dispatch
    }}>
      { children }
    </ChatContext.Provider>
  )
  
}
