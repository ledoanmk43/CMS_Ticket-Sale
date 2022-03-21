import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr'

import { Table, Modal, Checkbox, Divider, DatePicker } from 'antd'

import moment from 'moment'

const columns = [
  {
    key: '1',
    title: 'STT',
    dataIndex: 'id',
  },
  {
    key: '2',
    title: 'Booking code',
    dataIndex: 'bookingId',
  },
  {
    key: '3',
    title: 'Số vé',
    dataIndex: 'tickerId',
  },
  {
    key: '4',
    title: 'Tình trạng sử dụng',
    dataIndex: 'status',
    render: (status: string) => {
      let color = ''
      let statusName = ''
      let bg = ''
      switch (status) {
        case 'ready':
          color = '#03AC00'
          statusName = 'Chưa sử dụng'
          bg = '#DEF7E0'
          break
        case 'used':
          color = '#919DBA'
          bg = '#EAF1F8'
          statusName = 'Đã sử dụng'
          break

        case 'expired':
          color = '#FD5959'
          statusName = 'Hết hạn'
          bg = '#F8EBE8'
          break

        default:
          color = '#03AC00'
          statusName = 'Chưa sử dụng'
      }
      return (
        <div
          style={{
            backgroundColor: `${bg}`,
            borderColor: `${color}`,
            color: `${color}`,
          }}
          className='ticket-status'
        >
          <GoPrimitiveDot className='icon' /> {statusName}
        </div>
      )
    },
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
    tickerId: '1234',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '2',
    bookingId: 'ALTA112',
    tickerId: '1235',
    status: 'ready',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '3',
    bookingId: 'ALTA113',
    tickerId: '1236',
    status: 'expired',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 4',
  },
  {
    // key: '1',
    id: '4',
    bookingId: 'ALTA114',
    tickerId: '1237',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '5',
    bookingId: 'ALTA115',
    tickerId: '1238',
    status: 'ready',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '6',
    bookingId: 'ALTA116',
    tickerId: '1239',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '7',
    bookingId: 'ALTA117',
    tickerId: '1240',
    status: 'expired',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '8',
    bookingId: 'ALTA118',
    tickerId: '1241',
    status: 'used',
    dateUse: Date.now(),
    dateRelease: Date.now(),
    gate: 'Cổng 4',
  },
]
const CheckboxGroup = Checkbox.Group

const plainOptions: string[] = [
  'Tất cả',
  'Đã sử dụng',
  'Chưa sử dụng',
  'Hết hạn',
]
const defaultCheckedList = ['Đã sử dụng', 'Chưa sử dụng', 'Hết hạn']

export interface ITicketManageProps {}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (
  props: ITicketManageProps
) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)

  const onChange = (list: any) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }
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
          <button
            onClick={() => {
              setIsOpenModal(!isOpenModal)
              console.log(isOpenModal)
            }}
            className='btn-ticket'
          >
            <FiFilter className='icon' />
            Lọc vé
          </button>
          <button className='btn-ticket export'>Xuất file </button>
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
      {isOpenModal && (
        <Modal
          centered
          title='Lọc vé'
          closable={false}
          visible={isOpenModal}
          onOk={() => setIsOpenModal(false)}
          okText='Lọc'
          cancelButtonProps={{
            style: {
              display: 'none',
            },
          }}
        >
          <div className='date-picker'>
            <div className='from'>
              <p className='filter-heading'>Từ ngày</p>
              <DatePicker
                defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                format={'DD MMM, YYYY'}
                allowClear={false}
              />
            </div>
            <div className='to'>
              <p className='filter-heading'>Đến ngày</p>
              <DatePicker
                defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                format={'DD MMM, YYYY'}
                allowClear={false}
              />
            </div>
          </div>
          <div className='status'>
            <p className='filter-heading'>Tình trạng sử dụng</p>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Tất cả
            </Checkbox>
            <Divider />
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </div>
          <div className='gate'>
            <p className='filter-heading'>Cổng Check-in</p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default TicketManage
