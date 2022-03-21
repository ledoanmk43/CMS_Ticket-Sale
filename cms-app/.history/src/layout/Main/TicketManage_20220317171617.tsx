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
            placeholder='Search'
          />
          <SearchOutlined className='header-search-icon' />
        </div>
        <div className='sectionfilter'>
          <button>Lọc vé</button>
          <button>Lọc vé</button>
        </div>
      </div>
    </div>
  )
}

export default TicketManage
