import React, { useState } from 'react'
import logo from '../asset/logo.png'
import { useNavigate } from 'react-router-dom'

import { HiOutlineTicket } from 'react-icons/hi'
import { FiHome, FiSettings } from 'react-icons/fi'
import { RiNewspaperLine } from 'react-icons/ri'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src={logo} alt='logo-insight' />
      <div className='sidebar-container'>
        <div className='sidebar-container-item'>
          <FiHome className='icon' />
          <a className='sidebar-container-item-link' href='Dashboard'>
            Trang chủ
          </a>
        </div>
        <div className='sidebar-container-item'>
          <HiOutlineTicket className='icon' />
          <a className='sidebar-container-item-link' href='TicketManagement'>
            Quản lý vé
          </a>
        </div>
        <div
          onClick={navigate('/TicketManagement')}
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
          className={
            'sidebar-container-item' + (isSettingOpen ? '' : '-hidden')
          }
        >
          <a className='sidebar-container-item-link sub' href='ServicePack'>
            Gói dịch vụ
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
