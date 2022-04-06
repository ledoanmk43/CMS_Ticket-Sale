import React, { useState } from 'react'
import logo from '../assets/logo.png'
import cpr from '../assets/copyright.png'
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
        onClick={() => navigate('/home-dashboard')}
        className='sidebar-logo'
        src={logo}
        alt='logo-insight'
      />
      <div className='sidebar-container'>
        <div
          onClick={() => navigate('/home-dashboard')}
          className='sidebar-container-item'
        >
          <FiHome className='icon' />
          Trang chủ
        </div>
        <div
          onClick={() => navigate('/TicketManagement')}
          className='sidebar-container-item'
        >
          <HiOutlineTicket
            style={{ transform: 'rotate(180deg)' }}
            className='icon'
          />
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
          }}
        >
          <FiSettings className='icon' />
          Cài đặt
        </div>
        <div
          onClick={() => navigate('/ServicePack')}
          className={
            'sidebar-container-item sub' + (isSettingOpen ? '' : '-hidden')
          }
        >
          Gói dịch vụ
        </div>
      </div>
      <div className='sidebar-copyright'>
        <p className='sidebar-copyright-cpr'>
          Copyright <img src={cpr} alt='cpr' /> 2020 Alta Software
        </p>
      </div>
    </div>
  )
}

export default Sidebar
