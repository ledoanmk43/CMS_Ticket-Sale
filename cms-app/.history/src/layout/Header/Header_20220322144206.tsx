import React from 'react'
import { MailOutlined, SearchOutlined } from '@ant-design/icons'
import { FiBell, FiMail } from 'react-icons/fi'
import logo from '../asset/logo.png'

export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className='header'>
      <div className='header-search'>
        <input
          className='header-search-input'
          type='text'
          placeholder='Search'
        />
        <SearchOutlined className='header-search-icon' />
      </div>
      <div className='header-account'>
        <a href='/Dashboard' className='header-account-icon'>
          <FiMail />
        </a>
        <a href='/Dashboard' className='header-account-icon'>
          <FiBell />
        </a>
        <img className='header-account-avatar' src={logo} alt='user-img' />
      </div>
    </div>
  )
}

export default Header
