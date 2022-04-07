import React, { useState } from 'react'
import logo from '../assets/logo.png'
import cpr from '../assets/copyright.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { HiOutlineTicket } from 'react-icons/hi'
import { FiHome, FiSettings } from 'react-icons/fi'
import { RiNewspaperLine } from 'react-icons/ri'
import { is } from 'immer/dist/internal'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
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
          className={({ isActive }) =>
            isActive
              ? 'sidebar-container-item active'
              : 'sidebar-container-item'
          }
        >
          <FiHome className='icon' />
          Trang chủ
        </NavLink>
        <NavLink
          to='tickets-management'
          className={({ isActive }) =>
            isActive
              ? 'sidebar-container-item active'
              : 'sidebar-container-item'
          }
        >
          <HiOutlineTicket
            style={{ transform: 'rotate(180deg)' }}
            className='icon'
          />
          Quản lý vé
        </NavLink>
        <NavLink
          to='tickets-checking'
          className={({ isActive }) =>
            isActive
              ? 'sidebar-container-item active'
              : 'sidebar-container-item'
          }
        >
          <RiNewspaperLine className='icon' />
          Đối soát vé
        </NavLink>
        <NavLink
          to={location}
          onClick={() => {
            setIsSettingOpen(!isSettingOpen)
          }}
          className={({ isActive }) =>
            isActive && isSettingOpen
              ? 'sidebar-container-item active'
              : 'sidebar-container-item'
          }
        >
          <FiSettings className='icon' />
          Cài đặt
        </NavLink>
        <NavLink
          to='service-packages'
          className={({ isActive }) =>
            !isActive && !isSettingOpen
              ? 'sidebar-container-item sub active' +
                (isSettingOpen ? '' : '-hidden')
              : 'sidebar-container-item sub' + (isSettingOpen ? '' : '-hidden')
          }
        >
          Gói dịch vụ
        </NavLink>
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
