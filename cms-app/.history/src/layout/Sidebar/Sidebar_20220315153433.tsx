import React from 'react'
import logo from '../asset/logo.png'

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src={logo} alt='logo-insight' />
      <div className='sidebar-container'></div>
    </div>
  )
}

export default Sidebar
