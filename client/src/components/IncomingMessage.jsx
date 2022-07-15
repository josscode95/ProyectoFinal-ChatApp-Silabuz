import React from 'react'
import { horaMes } from '../helpers/fecha'

export const IncomingMessage = ({ msg }) => {
  return (
    <div>
      <div>
        <img src="https://ptetutorials.com/images/user-profile.png" alt="img_user"/>
      </div>
      <div>
        <div>
          <p>{ msg.mensaje }</p> 
          <span className='time_date'>{ horaMes(msg.createdAt) }</span>
        </div>
      </div>
    </div>
  )
}
