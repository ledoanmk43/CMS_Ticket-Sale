import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'

import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  // docId: any
}

const DropdownAntd: React.FunctionComponent<IDropdownAntdProps> = (
  props: IDropdownAntdProps
) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={() => {
        return <MenuAntd />
      }}
      arrow={{ pointAtCenter: true }}
      placement='topRight'
    >
      <BsThreeDotsVertical />
    </Dropdown>
  )
}

export default DropdownAntd
