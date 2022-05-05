import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'

import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  setModalChangeDate: any
  docId: any
  docTicketId: any
  docEventName: any
}

const DropdownAntd: React.FunctionComponent<IDropdownAntdProps> = (
  props: IDropdownAntdProps
) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  return (
    <Dropdown
      visible={isDropDownOpen}
      trigger={['click']}
      overlay={() => {
        return (
          <MenuAntd
            setModalChangeDate={props.setModalChangeDate}
            setIsDropDownOpen={setIsDropDownOpen}
            docId={props.docId}
          />
        )
      }}
      arrow={{ pointAtCenter: true }}
      placement='topRight'
    >
      <BsThreeDotsVertical
        key={props.docTicketId}
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      />
    </Dropdown>
  )
}

export default DropdownAntd
