import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../App'
import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  docId: any
}

const DropdownAntd: React.FunctionComponent<IDropdownAntdProps> = (
  props: IDropdownAntdProps
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
    <Dropdown
      trigger={['click']}
      overlay={() => {
        return <MenuAntd />
      }}
      arrow={{ pointAtCenter: true }}
      placement='topRight'
    >
      {props.docId}
      <BsThreeDotsVertical />
    </Dropdown>
  )
}

export default DropdownAntd
