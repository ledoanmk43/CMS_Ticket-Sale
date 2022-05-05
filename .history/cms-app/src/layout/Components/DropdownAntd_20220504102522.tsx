import React, { useEffect, useRef, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'

import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  setModalChangeDate: any
  docId: any
  onClickOutside: () => void
}

const DropdownAntd: React.FunctionComponent<IDropdownAntdProps> = (
  props: IDropdownAntdProps
) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
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
    <div
      onClickOutside={() => {
        setIsCalendarOpen(false)
      }}
    >
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
          key={props.docId}
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        />
      </Dropdown>
    </div>
  )
}

export default DropdownAntd
