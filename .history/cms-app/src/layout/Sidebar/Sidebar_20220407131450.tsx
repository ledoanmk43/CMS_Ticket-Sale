import React, { useState } from 'react'
import logo from '../assets/logo.png'
import cpr from '../assets/copyright.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'

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
        <NavLink
          to='/home-dashboard'
          // className='sidebar-container-item'
          activeClassName='active'
        >
          <FiHome className='icon' />
          Trang chủ
        </NavLink>
        <Link to='tickets-management' className='sidebar-container-item'>
          <HiOutlineTicket
            style={{ transform: 'rotate(180deg)' }}
            className='icon'
          />
          Quản lý vé
        </Link>
        <Link to='tickets-checking' className='sidebar-container-item'>
          <RiNewspaperLine className='icon' />
          Đối soát vé
        </Link>
        <div
          onClick={() => {
            setIsSettingOpen(!isSettingOpen)
          }}
          className='sidebar-container-item'
        >
          <FiSettings className='icon' />
          Cài đặt
        </div>
        <Link
          to='service-packages'
          className={
            'sidebar-container-item sub' + (isSettingOpen ? '' : '-hidden')
          }
        >
          Gói dịch vụ
        </Link>
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
