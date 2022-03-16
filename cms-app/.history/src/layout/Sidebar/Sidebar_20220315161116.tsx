import React from 'react'
import logo from '../asset/logo.png'

import { HiOutlineTicket } from 'react-icons/hi'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src={logo} alt='logo-insight' />
      <div className='sidebar-container'>
        <div className='sidebar-container-item'>
          <HomeOutlined className='icon' />
          Trang chủ
        </div>
        <div className='sidebar-container-item'>
          <HiOutlineTicket />
          Quản lý vé
        </div>
        <div className='sidebar-container-item'>Đối soát vé</div>
        <div className='sidebar-container-item'>
          Cài đặt
          <div className='sidebar-container-item-sub'>Gói dịch vụ</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
