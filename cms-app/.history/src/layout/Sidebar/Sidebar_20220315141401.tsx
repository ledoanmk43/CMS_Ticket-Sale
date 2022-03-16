import React from 'react'
import logo from '../asset/logo.png'
export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' srcSet={logo} alt='logo-insight' />
    </div>
  )
}

export default Sidebar
