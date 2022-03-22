import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'

import { Table, Modal, Checkbox, DatePicker } from 'antd'
import moment from 'moment'

export interface ITicketCheckProps {}

const columns = [
  {
    key: '1',
    title: 'STT',
    dataIndex: 'id',
  },
  {
    key: '2',
    title: 'Số vé',
    dataIndex: 'ticketId',
  },
  {
    key: '3',
    title: 'Ngày sử dụng',
    dataIndex: 'dateUse',
  },
  {
    key: '4',
    title: 'Tên loại vé',
    dataIndex: 'ticketName',
  },
  {
    key: '5',
    title: 'Cổng check-in',
    dataIndex: 'gate',
  },
  {
    key: '6',
    title: '',
    dataIndex: 'checkingStatus',
  },
]

const data = [
  {
    id: '1',
    ticketId: '1234',
    dateUse: Date.now(),
    ticketName: 'Vé cổng',
    gate: 'Cổng 1',
    checkingStatus: 'Chưa đối soát',
  },
]

const TicketCheck: React.FunctionComponent<ITicketCheckProps> = (props) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
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
      <Table
        rowKey='id'
        columns={columns}
        dataSource={data}
        pagination={{
          showTitle: false,
          position: ['bottomCenter'],
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          },
        }}
      ></Table>
    </div>
  )
}

export default TicketCheck
