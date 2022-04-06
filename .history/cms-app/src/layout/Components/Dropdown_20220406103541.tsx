import React from 'react'

export interface IDropdownProps {}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
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

export default Dropdown
