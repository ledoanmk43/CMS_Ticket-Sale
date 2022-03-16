import React from 'react'
import { MailOutlined, BellOutlined } from 'antd'

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
        <a href=''></a>
      </div>
    </div>
  )
}

export default Header
