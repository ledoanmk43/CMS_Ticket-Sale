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
  const [isDropDownOpen, setIsDropDownOpen] = useState<any>()
  return (
    <Dropdown
      visible={isDropDownOpen}
      trigger={['click']}
      overlay={() => {
        return (
          <MenuAntd
            onClickOutside={() => setIsDropDownOpen(false)}
            setModalChangeDate={props.setModalChangeDate}
            setIsDropDownOpen={setIsDropDownOpen}
            docId={props.docId}
            isDropDownOpen={false}
          />
        )
      }}
      arrow={{ pointAtCenter: true }}
      placement='topRight'
    >
      <BsThreeDotsVertical
        key={props.docId}
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      />
    </Dropdown>
  )
}

export default DropdownAntd
