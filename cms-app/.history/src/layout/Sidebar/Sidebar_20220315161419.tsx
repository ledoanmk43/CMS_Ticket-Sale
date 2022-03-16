import React from 'react'
import logo from '../asset/logo.png'

import { HiOutlineTicket } from 'react-icons/hi'
import { FiHome, FiSettings } from 'react-icons/fi'
import { RiNewspaperLine } from 'react-icons/ri'
import { RiNewspaperLine } from 'react-icons/ri'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src={logo} alt='logo-insight' />
      <div className='sidebar-container'>
        <div className='sidebar-container-item'>
          <FiHome className='icon' />
          Trang chủ
        </div>
        <div className='sidebar-container-item'>
          <HiOutlineTicket />
          Quản lý vé
        </div>
        <div className='sidebar-container-item'>
          <RiNewspaperLine />
          Đối soát vé
        </div>
        <div className='sidebar-container-item'>
          <FiSettings /> Cài đặt
          <div className='sidebar-container-item-sub'>Gói dịch vụ</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
