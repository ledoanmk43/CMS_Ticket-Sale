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
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <SubMenu
            key='sub1'
            icon={<MailOutlined />}
            title='Trang chủ'
          ></SubMenu>
          <SubMenu
            key='sub2'
            icon={<AppstoreOutlined />}
            title='Quản lý vé'
          ></SubMenu>
          <SubMenu
            key='sub3'
            icon={<AppstoreOutlined />}
            title='Đối soát vé'
          ></SubMenu>
          <SubMenu key='sub4' icon={<SettingOutlined />} title='Cài đặt'>
            <Menu.Item key='9'>Gói dịch vụ</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar
