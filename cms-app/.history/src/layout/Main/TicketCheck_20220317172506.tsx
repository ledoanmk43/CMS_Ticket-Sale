import React from 'react'

export interface ITicketCheckProps {}

const TicketCheck: React.FunctionComponent<ITicketCheckProps> = (props) => {
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
          <button>Lọc vé</button>
        </div>
      </div>
    </div>
  )
}

export default TicketCheck
