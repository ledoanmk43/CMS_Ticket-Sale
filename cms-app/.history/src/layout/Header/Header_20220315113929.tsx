import React from 'react'
import { MailOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons'

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
        <a href='/Dashboard' className='header-account-email'>
          <BellOutlined />
        </a>
      </div>
      <img
        className='header-account-avatar'
        src='https://lh3.googleusercontent.com/ogw/ADea4I4sThtNQHP4BO1RLGBhBhvvoDkrgT_z9ntYU8EhRA=s32-c-mo'
        alt='user-img'
      />
    </div>
  )
}

export default Header
