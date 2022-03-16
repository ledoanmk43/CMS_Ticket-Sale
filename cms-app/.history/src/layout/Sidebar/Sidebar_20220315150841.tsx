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
            title='Navigation One'
          ></SubMenu>
          <SubMenu
            key='sub2'
            icon={<AppstoreOutlined />}
            title='Navigation Two'
          ></SubMenu>
          <SubMenu
            key='sub3'
            icon={<AppstoreOutlined />}
            title='Navigation Three'
          ></SubMenu>
          <SubMenu key='sub4' icon={<SettingOutlined />} title='Cài đặt'>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <Menu.Item key='11'>Option 11</Menu.Item>
            <Menu.Item key='12'>Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar
