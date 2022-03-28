import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr'

import { Table, Modal, Checkbox, DatePicker } from 'antd'
import Calendar from '../Components/Calendar'

import moment from 'moment'
import { style } from '@mui/system'

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
    dataIndex: 'ticketId',
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
  {
    key: 'action',
    render: (record: any) => (
      <div>
        <a> {record.id}</a>
        <BsThreeDotsVertical />
      </div>
    ),
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
const CheckboxGroup = Checkbox.Group

const plainOptionsStatus: string[] = ['Đã sử dụng', 'Chưa sử dụng', 'Hết hạn']
const defaultCheckedListStatus = ['Đã sử dụng']

const plainOptionsGates: string[] = [
  'Cổng 1',
  'Cổng 2',
  'Cổng 3',
  'Cổng 4',
  'Cổng 5',
]
const defaultCheckedListGate = ['Cổng 1']

export interface ITicketManageProps {
  onClickOutside: React.DependencyList
}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (
  props: ITicketManageProps
) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkedListStatus, setCheckedListStatus] = useState(
    defaultCheckedListStatus
  )
  const [indeterminateStatus, setIndeterminateStatus] = useState(true)
  const [checkAllStatus, setCheckAllStatus] = useState(false)

  const [checkedListGate, setCheckedListGate] = useState(defaultCheckedListGate)
  const [indeterminateGate, setIndeterminateGate] = useState(true)
  const [checkAllGates, setCheckAllGates] = useState(false)
  const [isTicketUpdate, setIsTicketUpdate] = useState(false)

  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)

  // Status Checking
  const onChangeStatus = (list: any) => {
    setCheckedListStatus(list)
    setIndeterminateStatus(
      !!list.length && list.length < plainOptionsStatus.length
    )
    setCheckAllStatus(list.length === plainOptionsStatus.length)
  }

  const onCheckAllChangeStatus = (e: any) => {
    setCheckedListStatus(e.target.checked ? plainOptionsStatus : [])
    setIndeterminateStatus(false)
    setCheckAllStatus(e.target.checked)
  }
  //Gates checking
  const onChangeGate = (list: any) => {
    setCheckedListGate(list)
    setIndeterminateGate(
      !!list.length && list.length < plainOptionsGates.length
    )
    setCheckAllGates(list.length === plainOptionsGates.length)
  }

  const onCheckAllChangeGates = (e: any) => {
    setCheckedListGate(e.target.checked ? plainOptionsGates : [])
    setIndeterminateGate(false)
    setCheckAllGates(e.target.checked)
  }
  return (
    <div className='main'>
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
                <p className='heading-base'>Từ ngày</p>
                <DatePicker
                  onClick={() => setIsCalendarFromOpen(!isCalendaFromOpen)}
                  style={{ position: 'relative' }}
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD MMM, YYYY'}
                  allowClear={false}
                />
                {isCalendaFromOpen && (
                  <Calendar
                    onClickOutside={() => {
                      setIsCalendarFromOpen(false)
                    }}
                  />
                )}
              </div>
              <div className='to'>
                <p className='heading-base'>Đến ngày</p>
                <DatePicker
                  onClick={() => setIsCalendarToOpen((oldState) => !oldState)}
                  style={{ position: 'relative' }}
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD MMM, YYYY'}
                  allowClear={false}
                />
                {isCalendarToOpen && <Calendar />}
              </div>
            </div>

            <div className='status'>
              <p className='heading-base'>Tình trạng sử dụng</p>
              <Checkbox
                style={{ marginRight: '8px' }}
                indeterminate={indeterminateStatus}
                onChange={onCheckAllChangeStatus}
                checked={checkAllStatus}
              >
                Tất cả
              </Checkbox>
              <CheckboxGroup
                options={plainOptionsStatus}
                value={checkedListStatus}
                onChange={onChangeStatus}
              />
            </div>
            <div className='gate'>
              <p className='heading-base'>Cổng Check-in</p>
              <div className='flex-half'>
                <Checkbox
                  style={{ marginRight: '8px' }}
                  indeterminate={indeterminateGate}
                  onChange={onCheckAllChangeGates}
                  checked={checkAllGates}
                >
                  Tất cả
                </Checkbox>
                <CheckboxGroup
                  options={plainOptionsGates}
                  value={checkedListGate}
                  onChange={onChangeGate}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default TicketManage
