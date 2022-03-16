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
    </div>
  )
}

export default Header
