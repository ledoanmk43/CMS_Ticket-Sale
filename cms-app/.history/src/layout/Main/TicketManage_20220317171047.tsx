import React from 'react'
import { SearchOutlined } from '@ant-design/icons'

export interface ITicketManageProps {}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (props) => {
  return (
    <div className='container'>
      <p className='title_xl'> Danh sách vé</p>
      <div>
        <div className='header-search'>
          <input
            className='header-search-input'
            type='text'
            placeholder='Search'
          />
          <SearchOutlined className='header-search-icon' />
        </div>
      </div>
    </div>
  )
}

export default TicketManage
