import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'

import { Table, Modal, Checkbox, DatePicker, Select } from 'antd'
import moment from 'moment'

import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../App'
const CheckboxGroup = Checkbox.Group

const plainOptionsStatus: string[] = ['Chưa đối soát', 'Đã đối soát']
const defaultCheckedListStatus = ['Chưa đối soát']

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
    dataIndex: 'ticketType',
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
const TicketCheck: React.FunctionComponent<ITicketCheckProps> = (props) => {
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

  return (
    <div className='row'>
      <div className='main flex-1'>
        <div className='container '>
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
        </div>
      </div>
      <div className='main flex-half hide'>
        <div className='container  mr-24'>
          <p className='title_lg'> Lọc vé</p>
          <div className=' selection'>
            <Select defaultValue='Hội chợ triển lãm tiêu dùng 2021'>
              <Option value='hello'>Hội chợ triển lãm tiêu dùng 2021</Option>
              <Option value='hello'>Hội chợ triển lãm tiêu dùng 2021</Option>
              <Option value='hello'>Hội chợ triển lãm tiêu dùng 2021</Option>
            </Select>
          </div>
          <div className='section-col'>
            <div className='section flex-start'>
              <p className='heading-base'>Tình trạng đối soát</p>
              <div className='content'>
                <div className='checkbox'>
                  <Checkbox
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
              <div className='content'>
                <DatePicker
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                />
              </div>
            </div>
            <div className='section flex-start'>
              <p className='heading-base'>Đến ngày</p>
              <div className='content'>
                <DatePicker
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                />
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
