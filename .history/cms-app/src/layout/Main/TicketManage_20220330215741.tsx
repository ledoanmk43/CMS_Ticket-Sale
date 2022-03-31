import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr'

import { Table, Modal, Checkbox, DatePicker, Radio } from 'antd'

import Calendar from '../Components/Calendar'
import moment from 'moment'
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../App'
// import { onValue } from 'firebase/database'

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
    title: 'Tên sự kiện',
    dataIndex: 'eventName',
  },
  {
    key: '5',
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
    key: '6',
    title: 'Ngày sử dụng',
    dataIndex: 'dateUse',
  },
  {
    key: '7',
    title: 'Ngày xuất vé',
    dataIndex: 'dateRelease',
  },
  {
    key: '8',
    title: 'Cổng check-in',
    dataIndex: 'gate',
    render: (record: any) => {
      if (record.gate === null) return <div>-</div>
    },
  },
  {
    key: 'action',
    render: (record: any) => {
      if (record.status === 'ready')
        return (
          <div>
            <BsThreeDotsVertical />
          </div>
        )
    },
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

export interface ITicketManageProps {}

export interface Ticket {
  id: number
  bookingId: string
  ticketId: number
  eventName: string
  status: string
  dateUse: Date
  dateRelease: Date
  gate?: string
}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (
  props: ITicketManageProps
) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(6)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkedListStatus, setCheckedListStatus] = useState(
    defaultCheckedListStatus
  )
  const [indeterminateStatus, setIndeterminateStatus] = useState(true)
  const [checkAllStatus, setCheckAllStatus] = useState(false)

  const [checkedListGate, setCheckedListGate] = useState(defaultCheckedListGate)
  // const [indeterminateGate, setIndeterminateGate] = useState(true)
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
    // setIndeterminateGate(
    //   !!list.length && list.length < plainOptionsGates.length
    // )
    setCheckAllGates(false)
  }
  const onCheckAllChangeGates = (e: any) => {
    setCheckedListGate([])
    // setIndeterminateGate(false)
    setCheckAllGates(e.target.checked)
  }

  const [ticketsData, setTicketsData] = useState()

  useEffect(() => {
    const ticketsCollectionRef = collection(db, 'tickets')
    const getAllTickets = async () => {
      try {
        await getDocs(ticketsCollectionRef).then((snapshot) => {
          const tickets: any = []
          snapshot.forEach((doc) => {
            console.log(doc.data())
            tickets.push(doc.data())
          })
          setTicketsData(tickets.sort((a: any, b: any) => a.id - b.id))
        })
      } catch (err) {
        console.error(err)
      }
    }
    getAllTickets()
  }, [])
  console.log(ticketsData)

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
          dataSource={ticketsData}
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
            visible={isOpenModal}
            centered
            title='Lọc vé'
            closable={false}
            onOk={() => setIsOpenModal(false)}
            okText='Lọc'
            cancelButtonProps={{
              style: {
                display: 'none',
              },
            }}
            maskClosable={true}
          >
            <div className='date-picker'>
              <div className='from'>
                <p className='heading-base'>Từ ngày</p>
                <DatePicker
                  onClick={() => setIsCalendarFromOpen(!isCalendaFromOpen)}
                  style={{ position: 'relative' }}
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD/MM/YYYY'}
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
                  onClick={() => setIsCalendarToOpen(!isCalendarToOpen)}
                  style={{ position: 'relative' }}
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                />
                {isCalendarToOpen && (
                  <Calendar
                    onClickOutside={() => {
                      setIsCalendarToOpen(false)
                    }}
                  />
                )}
              </div>
            </div>

            <div className='status'>
              <p className='heading-base'>Tình trạng sử dụng</p>
              <Radio.Group name='radiogroup' defaultValue={1}>
                <Radio value={1}>Tất cả</Radio>
                <Radio value={2}>Đã sử dụng</Radio>
                <Radio value={3}>Chưa sử dụng</Radio>
                <Radio value={4}>Hết hạn</Radio>
              </Radio.Group>
            </div>
            <div className='gate'>
              <p className='heading-base'>Cổng Check-in</p>
              <div className='flex-half'>
                <Checkbox
                  style={{ marginRight: '8px' }}
                  // indeterminate={indeterminateGate}
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
