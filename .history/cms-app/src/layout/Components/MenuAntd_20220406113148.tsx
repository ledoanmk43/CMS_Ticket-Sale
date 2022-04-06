import { Menu } from 'antd'
import React from 'react'

export interface IMenuAntdProps {
  docId: number
}

const MenuAntd: React.FunctionComponent<IMenuAntdProps> = (
  props: IMenuAntdProps
) => {
  return (
    <Menu selectable className='menu'>
      <div>
        <Menu.Item key='1'>Sử dụng vé</Menu.Item>
        <Menu.Item key='2'>Đổi ngày sử dụng</Menu.Item>
      </div>
    </Menu>
  )
}

export default MenuAntd
