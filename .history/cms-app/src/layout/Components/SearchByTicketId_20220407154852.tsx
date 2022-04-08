import { SearchOutlined } from '@ant-design/icons'
import React from 'react'

export interface ISearchByTicketIdProps {}

const SearchByTicketId: React.FunctionComponent<ISearchByTicketIdProps> = (
  props
) => {
  return (
    <div className='section-search'>
      <input
        className='section-search-input'
        type='text'
        placeholder='Tìm bằng số vé'
      />
      <SearchOutlined className='header-search-icon' />
    </div>
  )
}

export default SearchByTicketId
