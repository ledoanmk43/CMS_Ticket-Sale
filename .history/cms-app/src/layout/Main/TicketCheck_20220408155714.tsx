import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'

import { Table, Modal, Checkbox, DatePicker, Select, Radio } from 'antd'
import moment from 'moment'

import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../App'
import Calendar from '../Components/Calendar'
import { Ticket } from './Home'
const CheckboxGroup = Checkbox.Group

const plainOptionsStatus: string[] = ['Chưa đối soát', 'Đã đối soát']
const defaultCheckedListStatus = ['Chưa đối soát']

export interface ITicketCheckProps {
  ticketsData: Ticket | undefined
}

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
  // {
  //   key: '3',
  //   title: 'Tên sự kiện',
  //   dataIndex: 'eventName',
  // },
  {
    key: '4',
    title: 'Ngày sử dụng',
    dataIndex: 'dateUse',
    render: (dateUse: any) => {
      const result = dateUse.toDate().toLocaleDateString('vi-VN')
      return (
        <div style={{ textAlign: 'right', paddingRight: '1rem' }}>{result}</div>
      )
    },
  },
  {
    key: '5',
    title: 'Tên loại vé',
    dataIndex: 'ticketType',
  },
  {
    key: '6',
    title: 'Cổng check-in',
    dataIndex: 'gate',
  },
  {
    key: '7',
    title: '',
    dataIndex: 'checkingStatus',
    render: (checkingStatus: boolean) => {
      let color = ''
      let statusName = ''
      let opacity = ''
      if (checkingStatus) {
        color = '#FD5959'
        opacity = '1'
        statusName = 'Đã đối soát'
      } else if (!checkingStatus) {
        color = '#A5A8B1'
        statusName = 'Chưa đối soát'
        opacity = '0.8'
      }
      return (
        <div
          style={{
            fontStyle: 'italic',
            fontWeight: 500,
            opacity: `${opacity}`,
            color: `${color}`,
          }}
          className='ticket-status border-none'
        >
          {statusName}
        </div>
      )
    },
  },
]

const { Option } = Select
const TicketCheck: React.FunctionComponent<ITicketCheckProps> = (
  props: ITicketCheckProps
) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(6)
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkedListStatus, setCheckedListStatus] = useState(
    defaultCheckedListStatus
  )
  const [indeterminateStatus, setIndeterminateStatus] = useState(true)
  const [checkAllStatus, setCheckAllStatus] = useState(false)
  // Status Checking
  const onChangeStatus = (list: any) => {
    setCheckedListStatus(list)
    // setIndeterminateStatus(
    //   !!list.length && list.length < plainOptionsStatus.length
    // )
    setCheckAllStatus(false)
  }
  const onCheckAllChangeStatus = (e: any) => {
    setCheckedListStatus([])
    // setIndeterminateStatus(false)
    setCheckAllStatus(e.target.checked)
  }
  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)
  const [ticketsData, setTicketsData] = useState<any>()
  const [searchValue, setSearchValue] = useState<string>('')

  // console.log(JSON.stringify(props.ticketsData))
  const data = JSON.stringify(props.ticketsData)
  useEffect(() => {
    setTicketsData(props.ticketsData)
  }, [props.ticketsData])

  return (
    <div className='row'>
      <div className='main h-base flex-1'>
        <div className='container'>
          <p className='title_xl'> Đối soát vé</p>
          <div className='section'>
            <div className='section-search'>
              <input
                className='section-search-input'
                type='text'
                placeholder='Tìm bằng số vé'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SearchOutlined className='header-search-icon' />
            </div>
            <div className='filter'>
              <button className='btn-ticket'>Chốt đối soát</button>
            </div>
          </div>
          <TableAntd
            className='table-check'
            ticketsData={props.ticketsData}
            searchValue={searchValue}
          />
        </div>
      </div>
      <div className='main flex-half hide'>
        <div className='container  mr-24'>
          <p className='title_lg'> Lọc vé</p>
          <div className='selection'>
            <Select defaultValue='Hội chợ triển lãm tiêu dùng 2021'>
              <Option value='1'>Hội chợ triển lãm tiêu dùng 2021</Option>
              <Option value='2'>Hội chợ triển lãm tiêu dùng 2021</Option>
              <Option value='3'>Hội chợ triển lãm tiêu dùng 2021</Option>
            </Select>
          </div>
          <div className='section-col'>
            <div className='section flex-start mt-1rem'>
              <p className='heading-base'>Tình trạng đối soát</p>
              <div className='content'>
                <div className='checkbox'>
                  <Radio.Group name='radiogroup' defaultValue={1}>
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Đã sử dụng</Radio>
                    <Radio value={3}>Chưa sử dụng</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className='section flex-start'>
              <p className='heading-base'>Loại vé</p>
              <div className='content'>
                <span className='ticket'>Vé cổng</span>
              </div>
            </div>
            <div className='section flex-start'>
              <p className='heading-base'>Từ ngày</p>
              <div className='ml-2rem'>
                <DatePicker
                  onClick={() => setIsCalendarFromOpen(!isCalendaFromOpen)}
                  style={{ width: '100%', position: 'relative' }}
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
            </div>
            <div className='section flex-start'>
              <p className='heading-base'>Đến ngày</p>
              <div className='ml-2rem'>
                <DatePicker
                  onClick={() => setIsCalendarToOpen(!isCalendarToOpen)}
                  style={{ width: '100%', position: 'relative' }}
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
            <button className='btn-filter'>Lọc</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketCheck
