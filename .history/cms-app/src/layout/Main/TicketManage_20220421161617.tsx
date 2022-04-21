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

  const options = [
    { label: 'Tất cả', value: '' },
    { label: 'Đã sử dụng', value: 'used' },
    { label: 'Chưa sử dụng', value: 'ready' },
    { label: 'Hết hạn', value: 'expired' },
  ]
  const defaultCheckedListStatus = ['Đã sử dụng']
  const plainOptionsGates: string[] = [
    'Cổng 1',
    'Cổng 2',
    'Cổng 3',
    'Cổng 4',
    'Cổng 5',
  ]

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)

  // Status Checking
  const [checkedStatus, setCheckedStatus] = useState<any>(options[1].value)
  const onChangeStatus = (e: any) => {
    setCheckedStatus(e.target.value)
  }

  //Gates checking
  const [checkAllGates, setCheckAllGates] = useState(false)
  const [checkedListGate, setCheckedListGate] = useState<any>()

  const onCheckAllChangeGates = (e: any) => {
    setCheckAllGates(e.target.checked)
    !checkAllGates
      ? setCheckedListGate(plainOptionsGates)
      : setCheckedListGate([])
  }

  const onChangeGate = (list: any) => {
    setCheckedListGate(list)
    list.length === 5 ? setCheckAllGates(true) : setCheckAllGates(false)
  }
  //--------------
  const [searchValue, setSearchValue] = useState<string>('')

  const [filterValue, setFilterValue] = useState<any>()
  const handleFilter = () => {
    if (checkedStatus !== '') {
      checkedListGate.map((gate: any, index: number) => {
        return {
          status: checkedStatus,
          gate: checkedListGate[index],
        }
      })
    } else {
      setFilterValue(checkedListGate)
    }
    setIsOpenModal(false)
  }
  useEffect(() => {
    setCheckAllGates(false)
  }, [])

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
          ticketsData={props.ticketsData}
          searchValue={searchValue}
          filterValue={filterValue}
        />
        {isOpenModal && (
          <Modal
            visible={isOpenModal}
            centered
            title='Lọc vé'
            closable={false}
            onOk={handleFilter}
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
              <Radio.Group
                options={options}
                onChange={onChangeStatus}
                defaultValue={options[1].value}
              />
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
