import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../App'
import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  docId: number
}

const DropdownAntd: React.FunctionComponent<IDropdownAntdProps> = (
  props: IDropdownAntdProps
) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={() => {
        return <MenuAntd docId={props.docId} />
      }}
      arrow={{ pointAtCenter: true }}
      placement='topRight'
    >
      <BsThreeDotsVertical />
    </Dropdown>
  )
}

export default DropdownAntd
