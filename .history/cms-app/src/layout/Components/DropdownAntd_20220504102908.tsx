import React, { useEffect, useRef, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'

import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  setModalChangeDate: any
  docId: any
  onClickOutside: () => void
  setIsDropDownOpen: any
  isDropDownOpen: boolean
}

const DropdownAntd: React.FunctionComponent<IDropdownAntdProps> = (
  props: IDropdownAntdProps
) => {
  const ref = useRef<any>(null)
  const { onClickOutside } = props

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])
  return (
    <Dropdown
      visible={props.isDropDownOpen}
      trigger={['click']}
      overlay={() => {
        return (
          <MenuAntd
            setModalChangeDate={props.setModalChangeDate}
            setIsDropDownOpen={props.etIsDropDownOpen}
            docId={props.docId}
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
