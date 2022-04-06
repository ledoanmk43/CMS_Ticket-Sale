import { Menu } from 'antd'
import React from 'react'

export interface IMenuAntdProps {
  docId: number
}

const MenuAntd: React.FunctionComponent<IMenuAntdProps> = (
  props: IMenuAntdProps
) => {
  const changeStatus = async () => {
    try {
      const ticketRef = doc(db, 'tickets')
      await updateDoc(ticketRef, {
        status: 'used',
      })
      console.log(ticketRef)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Menu selectable className='menu'>
      <Menu.Item key='1'>Sử dụng vé</Menu.Item>
      <Menu.Item key='2'>Đổi ngày sử dụng</Menu.Item>
    </Menu>
  )
}

export default MenuAntd
