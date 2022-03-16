import React from 'react'
import logo from '../asset/logo.png'
export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src={logo} alt='logo-insight' />
      <div className=''>
        <ul className='sidebar-menu'>
          <li className='sidebar-menu-item'>
            <a href='/Dashboard' className='sidebar-menu-item-link'>
              Trang chủ
            </a>
          </li>
          <li className='sidebar-menu-item'>
            <a href='/TicketManagement' className='sidebar-menu-item-link'>
              Quản lý vé
            </a>
          </li>
          <li className='sidebar-menu-item'>
            <a href='/TicketCheck' className='sidebar-menu-item-link'>
              Đối soát vé
            </a>
          </li>
          <li className='sidebar-menu-item'>
            <a href='/Dashboard' className='sidebar-menu-item-link'>
              Cài đặt
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
