import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'

export interface ITicketCheckProps {}

const TicketCheck: React.FunctionComponent<ITicketCheckProps> = (props) => {
  return (
    <div className='container'>
      <p className='title_xl'> Đối soát vé</p>
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
          <button className='btn-ticket'>Chốt đối soát</button>
        </div>
      </div>
      <div className='section'></div>
    </div>
  )
}

export default TicketCheck
