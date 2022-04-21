import React, { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { Table, Modal, Checkbox, DatePicker, Radio } from 'antd'
import Calendar from '../Components/Calendar'
import moment from 'moment'
import { Ticket } from './Home'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../App'
import DropdownAntd from '../Components/DropdownAntd'
import TableAntd from '../Components/TableAntd'
import useDebounce from '../../hooks/useDebounce'
import { CSVLink, CSVDownload } from 'react-csv'

const headers = [
  { label: 'First Name', key: 'firstname' },
  { label: 'Last Name', key: 'lastname' },
  { label: 'Email', key: 'email' },
]

const data = [
  { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
]
export interface ITicketManageProps {
  ticketsData: Ticket | undefined
}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (
  props: ITicketManageProps
) => {
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

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkedListStatus, setCheckedListStatus] = useState(
    defaultCheckedListStatus
  )
  const [indeterminateStatus, setIndeterminateStatus] = useState(true)
  const [checkAllStatus, setCheckAllStatus] = useState(false)

  // const [indeterminateGate, setIndeterminateGate] = useState(true)
  const [checkAllGates, setCheckAllGates] = useState(false)
  // const [isTicketUpdate, setIsTicketUpdate] = useState(false)

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
  const { status, gates } = gatefilterVal
  const [checkedListGate, setCheckedListGate] = useState(defaultCheckedListGate)
  const [gatefilterVal, setGatefilterVal] = useState(defaultCheckedListGate)
  const onCheckAllChangeGates = (e: any) => {
    setCheckedListGate([])

    setCheckAllGates(e.target.checked)
  }

  const onChangeGate = (list: any) => {
    setCheckedListGate(list)
    setGatefilterVal(checkedListGate)
    setCheckAllGates(false)
    console.log(gatefilterVal)
  }

  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <div className='main h-base col'>
      <div className='container'>
        <p className='title_xl'> Danh sách vé</p>
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
            <button
              onClick={() => {
                setIsOpenModal(!isOpenModal)
              }}
              className='btn-ticket'
            >
              <FiFilter className='icon' />
              Lọc vé
            </button>
            <CSVLink
              data={data}
              headers={headers}
              className='btn-ticket export'
            >
              Xuất file{' (.csv)'}
            </CSVLink>
          </div>
        </div>
        <TableAntd
          isManage={true}
          ticketsData={props.ticketsData}
          searchValue={searchValue}
        />
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
