import { Menu } from 'antd'
import React from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../App'
export interface IMenuAntdProps {
  docId: any
}

const MenuAntd: React.FunctionComponent<IMenuAntdProps> = (
  props: IMenuAntdProps
) => {
  const changeStatus = async () => {
    console.log('click')
    try {
      const ticketRef = doc(db, 'tickets', props.docId)
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
      <Menu.Item onClick={changeStatus} key='1'>
        Sử dụng vé
      </Menu.Item>
      <Menu.Item key='2'>Đổi ngày sử dụng</Menu.Item>
    </Menu>
  )
}

export default MenuAntd
