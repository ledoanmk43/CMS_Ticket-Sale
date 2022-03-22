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
    key: '5',
    title: 'Ngày sử dụng',
    dataIndex: 'dateUse',
  },
  {
    key: '6',
    title: 'Ngày xuất vé',
    dataIndex: 'dateRelease',
  },
  {
    key: '7',
    title: 'Cổng check-in',
    dataIndex: 'gate',
  },
]

const data = [
  {
    // key: '1',
    id: '1',
    bookingId: 'ALTA111',
    ticketId: '1234',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '2',
    bookingId: 'ALTA112',
    ticketId: '1235',
    status: 'ready',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '3',
    bookingId: 'ALTA113',
    ticketId: '1236',
    status: 'expired',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 4',
  },
  {
    // key: '1',
    id: '4',
    bookingId: 'ALTA114',
    ticketId: '1237',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '5',
    bookingId: 'ALTA115',
    ticketId: '1238',
    status: 'ready',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '6',
    bookingId: 'ALTA116',
    ticketId: '1239',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '7',
    bookingId: 'ALTA117',
    ticketId: '1240',
    status: 'expired',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '8',
    bookingId: 'ALTA118',
    ticketId: '1241',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 4',
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
