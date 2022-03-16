import React from 'react'
import logo from '../asset/insight-05 1.png'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src='logo ' alt='logo-insight' />
    </div>
  )
}

export default Sidebar
