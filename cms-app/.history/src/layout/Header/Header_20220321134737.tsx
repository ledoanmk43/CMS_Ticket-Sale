import React from 'react'
import { MailOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons'
import { FiBell } from 'react-icons/fi'

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
          <MailOutlined />
        </a>
        <a href='/Dashboard' className='header-account-icon'>
          <FiBell />
        </a>
        <img
          className='header-account-avatar'
          src='https://lh3.google.com/u/1/ogw/ADea4I4iNPSts8YZR7c6elfB8ElgPkhqy4kTzGxvMnFK=s32-c-mo'
          alt='user-img'
        />
      </div>
    </div>
  )
}

export default Header
