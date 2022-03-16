import React from 'react'
import logo from '../asset/logo-insight.png'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img
        className='sidebar-logo'
        src='../asset/logo-insight.png'
        alt='logo-insight'
      />
    </div>
  )
}

export default Sidebar