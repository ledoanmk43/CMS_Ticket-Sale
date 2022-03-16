import React from 'react'
import { MailOutlined, BellOutlined } from '@ant-design/icons'

export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className='header'>
      <div className='search'>
        <input type='text' placeholder='Search...' />
      </div>
      <div className='account'>
        <a href='/Dashboard' className='email'>
          <MailOutlined />
        </a>
        <a href='/Dashboard'>
          <BellOutlined />
        </a>
      </div>
      <img
        src='https://lh3.googleusercontent.com/ogw/ADea4I4sThtNQHP4BO1RLGBhBhvvoDkrgT_z9ntYU8EhRA=s32-c-mo'
        alt='user-img'
      />
    </div>
  )
}

export default Header
