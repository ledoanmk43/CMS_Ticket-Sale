import React from 'react'
import { SearchOutlined } from '@ant-design/icons'

export interface ITicketManageProps {}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (props) => {
  return (
    <div className='container'>
      <p className='title_xl'> Danh sách vé</p>
      <div className='section'>
        <div className='section-search'>
          <input
            className='section-search-input'
            type='text'
            placeholder='Tìm bằng số vé'
          />
          <SearchOutlined className='header-search-icon' />
        </div>
        <div className='filter'>
          <button>Lọc vé</button>
          <button className='export'>Xuất file </button>
        </div>
      </div>
    </div>
  )
}

export default TicketManage
