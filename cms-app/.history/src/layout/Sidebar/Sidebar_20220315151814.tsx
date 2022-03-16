import React from 'react'
import logo from '../asset/logo.png'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu
export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' src={logo} alt='logo-insight' />
      <div className='sidebar-container'>
        <Menu
          className='sidebar-menu'
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <SubMenu
            className='sidebar-menu-item'
            key='sub1'
            icon={<MailOutlined className='sidebar-menu-item' />}
            title='Trang chủ'
          ></SubMenu>
          <SubMenu
            className='sidebar-menu-item'
            key='sub2'
            icon={<AppstoreOutlined className='sidebar-menu-item' />}
            title='Quản lý vé'
          ></SubMenu>
          <SubMenu
            className='sidebar-menu-item'
            key='sub3'
            icon={<AppstoreOutlined className='sidebar-menu-item' />}
            title='Đối soát vé'
          ></SubMenu>
          <SubMenu
            key='sub4'
            icon={<SettingOutlined className='sidebar-menu-item' />}
            title='Cài đặt'
          >
            <Menu key='sub5' className='sidebar-menu'>
              Gói dịch vụ
            </Menu>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar
