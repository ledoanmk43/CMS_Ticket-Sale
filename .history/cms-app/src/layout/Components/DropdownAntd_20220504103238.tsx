import React, { useEffect, useRef, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'

import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  setModalChangeDate: any
  docId: any
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
        onClickOutside={() => {
          setIsDropDownOpen(false)
        }}
        isDropDownOpen={isDropDownOpen}
        setIsDropDownOpen={setIsDropDownOpen}
        key={props.docId}
        onClick={() => props.setIsDropDownOpen(!props.isDropDownOpen)}
      />
    </Dropdown>
  )
}

export default DropdownAntd
