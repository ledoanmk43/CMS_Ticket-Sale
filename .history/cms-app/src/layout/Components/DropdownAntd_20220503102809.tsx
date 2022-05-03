import React, { useEffect, useRef, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'

import MenuAntd from './MenuAntd'

export interface IDropdownAntdProps {
  onClickOutside?: () => void
  docId: any
  docTicketId: any
  docEventName: any
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
    <Dropdown
      visible={isDropDownOpen}
      trigger={['click']}
      overlay={() => {
        return (
          <MenuAntd
            onClickOutside={() => {
              setIsDropDownOpen(false)
            }}
            docTicketId={props.docTicketId}
            docEventName={props.docEventName}
            setIsDropDownOpen={setIsDropDownOpen}
            docId={props.docId}
          />
        )
      }}
      arrow={{ pointAtCenter: true }}
      placement='topRight'
    >
      <BsThreeDotsVertical onClick={() => setIsDropDownOpen(!isDropDownOpen)} />
    </Dropdown>
  )
}

export default DropdownAntd
