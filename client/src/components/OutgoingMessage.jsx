import React from 'react'
import { horaMes } from '../helpers/fecha'

export const OutgoingMessage = ({msg}) => {
  return (
    <div className='messages-out'>
      <p>{ msg.mensaje }</p>
      <span>{ horaMes(msg.createdAt) }</span>
    </div>
  )
}
