import React from 'react'
import logo from '../asset/logo.png'
export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src={logo} alt='logo-insight' />
      <div className='sider-nav'>dropdown-menu {}</div>
    </div>
  )
}

export default Sidebar
