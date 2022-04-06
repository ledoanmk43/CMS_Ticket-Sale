import React from 'react'
import { Menu, Dropdown } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'

export interface IDropdownAntdProps {}

const DropdownAntd: React.FunctionComponent<IDropdownAntdProps> = (props) => {
  const [ticketsData, setTicketsData] = useState<any>()
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
        return (
          <Menu className='menu'>
            <Menu.Item onClick={() => changeStatus} key='1'>
              Sử dụng vé
            </Menu.Item>
            <Menu.Item key='2'>Đổi ngày sử dụng</Menu.Item>
          </Menu>
        )
      }}
      arrow={{ pointAtCenter: true }}
      placement='topRight'
    >
      <BsThreeDotsVertical />
    </Dropdown>
  )
}

export default DropdownAntd
