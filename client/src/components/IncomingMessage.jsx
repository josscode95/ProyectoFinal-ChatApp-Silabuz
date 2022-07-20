import React from 'react'
import { horaMes } from '../helpers/fecha'

export const IncomingMessage = ({ msg }) => {
  return (
    <div className='messages-inc'>
      <p>{ msg.mensaje }</p> 
      <span>{ horaMes(msg.createdAt) }</span>
    </div>
  )
}
