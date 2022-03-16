import React, { useState } from 'react'
import logo from '../asset/logo.png'
import { useNavigate } from 'react-router-dom'

import { HiOutlineTicket } from 'react-icons/hi'
import { FiHome, FiSettings } from 'react-icons/fi'
import { RiNewspaperLine } from 'react-icons/ri'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <div className='sidebar'>
      <img
        onClick={() => navigate('/')}
        className='sidebar-logo'
        src={logo}
        alt='logo-insight'
      />
      <div className='sidebar-container'>
        <div
          onClick={() => navigate('/Dashboard')}
          className='sidebar-container-item'
        >
          <FiHome className='icon' />
          Trang chủ
        </div>
        <div
          onClick={() => navigate('/TicketManagement')}
          className='sidebar-container-item'
        >
          <HiOutlineTicket className='icon' />
          Quản lý vé
        </div>
        <div
          onClick={() => navigate('/TicketCheck')}
          className='sidebar-container-item'
        >
          <RiNewspaperLine className='icon' />
          Đối soát vé
        </div>
        <div
          className='sidebar-container-item'
          onClick={() => {
            setIsSettingOpen(!isSettingOpen)
            console.log(isSettingOpen)
          }}
        >
          <FiSettings className='icon' />
          Cài đặt
        </div>
        <div
          onClick={() => navigate('/ServicePack')}
          className={
            'sidebar-container-item' + (isSettingOpen ? '' : '-hidden')
          }
        >
          Gói dịch vụ
        </div>
      </div>
    </div>
  )
}

export default Sidebar