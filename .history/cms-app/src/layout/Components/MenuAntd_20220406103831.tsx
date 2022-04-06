import React from 'react'

export interface IMenuAntdProps {}

const MenuAntd: React.FunctionComponent<IMenuAntdProps> = (props) => {
  return (
    <Menu className='menu'>
      <Menu.Item onClick={() => changeStatus} key='1'>
        Sử dụng vé
      </Menu.Item>
      <Menu.Item key='2'>Đổi ngày sử dụng</Menu.Item>
    </Menu>
  )
}

export default MenuAntd
