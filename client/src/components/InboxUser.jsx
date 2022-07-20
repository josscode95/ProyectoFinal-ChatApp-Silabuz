import React from 'react'
import { SearchBox } from './SearchBox'
import { Sidebar } from './Sidebar'

export const InboxUser = () => {
  return (
    <div className='sidebar'>
      <SearchBox />
      <Sidebar />
    </div>
  )
}
