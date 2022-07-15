import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = ( serverPath ) => {

  const [ socket, setSocket ] = useState(null);
  const [ online, setOnline ] = useState( false );

  const conectarSocket = useCallback(() => {
    const token = localStorage.getItem('token')
    const socketTemp = io.connect(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': token
      }
    })
    setSocket( socketTemp )
  }, [ serverPath ])

  const desconectarSocket = useCallback(() => {
    socket?.disconnect()
  }, [ socket ])

  useEffect(() => {
    setOnline( socket?.connected ) // <-- true o false
  }, [ socket ]) //evaluar el socket cuando cambia
  
  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true)
    })
  }, [ socket ])

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false)
    })
  }, [ socket ])
  
  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket 
  }

}