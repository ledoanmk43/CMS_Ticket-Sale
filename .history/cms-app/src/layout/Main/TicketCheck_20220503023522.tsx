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
  Timestamp,
} from 'firebase/firestore'
import { db } from '../../App'
import Calendar from '../Components/Calendar'
import { Ticket } from './Home'

import useDebounce from '../../hooks/useDebounce'
const CheckboxGroup = Checkbox.Group

export interface ITicketCheckProps {
  ticketsData: Ticket | undefined | any
}

const { Option } = Select
const TicketCheck: React.FunctionComponent<ITicketCheckProps> = (
  props: ITicketCheckProps
) => {
  const [defaultData, setDefaultData] = useState<any>()

  const [tableData, setTableData] = useState<Ticket>()

  const columnsCheck = [
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
      key: '4',
      title: 'Ngày sử dụng',
      dataIndex: 'dateUse',
      render: (dateUse: any) => {
        const result = dateUse.toDate().toLocaleDateString('en-GB')
        return (
          <div style={{ textAlign: 'right', paddingRight: '1rem' }}>
            {result}
          </div>
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
  const options = [
    { label: 'Tất cả', value: '' },
    { label: 'Đã sử dụng', value: 'true' },
    { label: 'Chưa sử dụng', value: 'false' },
  ]
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)

  const [searchValue, setSearchValue] = useState<string>('')
  //Date checking
  const [dateFrom, setDateFrom] = useState<any>(new Date())
  const [dateTo, setDateTo] = useState<any>(new Date())
  // Status Checking
  const [checkedStatus, setCheckedStatus] = useState<any>(options[0].value)
  const onChangeStatus = (e: any) => {
    setCheckedStatus(e.target.value)
  }

  const debounceSearch: any = useDebounce(searchValue, 400)
  const [filterValue, setFilterValue] = useState<any>()
  // const handleFilter = () => {
  //   if (checkedStatus !== '') {
  //     setFilterValue(
  //       checkedListGate.map((gate: any, index: number) => {
  //         return {
  //           dateFrom: Timestamp.fromDate(dateFrom),
  //           dateTo: Timestamp.fromDate(dateTo),
  //           status: checkedStatus,
  //           gate: checkedListGate[index],
  //         }
  //       })
  //     )
  //   } else {
  //     setFilterValue(
  //       checkedListGate.map((gate: any, index: number) => {
  //         return {
  //           dateFrom: Timestamp.fromDate(dateFrom),
  //           dateTo: Timestamp.fromDate(dateTo),
  //           gate: checkedListGate[index],
  //         }
  //       })
  //     )
  //   }
  //   setIsOpenModal(false)
  // }
  const handleFilter = () => {
    if (checkedStatus !== '') {
      setFilterValue(
        checkedStatus.map((item: Ticket, index: number) => {
          return {
            dateFrom: Timestamp.fromDate(dateFrom),
            dateTo: Timestamp.fromDate(dateTo),
            checkingStatus: checkedStatus[index],
          }
        })
      )
    } else {
      setFilterValue(
        checkedStatus.map((item: Ticket, index: number) => {
          return {
            dateFrom: Timestamp.fromDate(dateFrom),
            dateTo: Timestamp.fromDate(dateTo),
            checkingStatus: checkedStatus[index],
          }
        })
      )
    }
  }
  useEffect(() => {
    if (debounceSearch) {
      setTableData(
        props.ticketsData.filter((item: Ticket) =>
          item.ticketId.includes(debounceSearch)
        )
      )
    }
    if (filterValue) {
      if (checkedStatus !== '') {
        //tất cả status
        setDefaultData(
          props.ticketsData.filter((item: Ticket) => {
            for (let i = 0; i < filterValue.length; i++) {
              if (
                item.dateUse >= filterValue[i].dateFrom &&
                item.dateUse <= filterValue[i].dateTo
              ) {
                return item
              }
            }
          })
        )
      } else {
        //ngược lại
        setDefaultData(
          props.ticketsData.filter((item: Ticket) => {
            for (let i = 0; i < filterValue.length; i++) {
              if (
                JSON.stringify(item.checkingStatus) ===
                  JSON.stringify(filterValue[i].checkingStatus) &&
                item.dateUse >= filterValue[i].dateFrom &&
                item.dateUse <= filterValue[i].dateTo
              ) {
                return item
              }
            }
          })
        )
      }
    } else {
      setDefaultData(props.ticketsData)
    }
  }, [debounceSearch, props.ticketsData, filterValue])

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
          <Table
            className='table table-check'
            rowKey='id'
            columns={columnsCheck}
            dataSource={debounceSearch.length ? tableData : defaultData}
            pagination={{
              showTitle: false,
              position: ['bottomCenter'],
              current: page,
              pageSize: pageSize,
              defaultPageSize: 5,
              showSizeChanger: false,
              pageSizeOptions: ['10', '20', '30'],
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
          {/* <div className='selection'>
            <Select defaultValue='Hội chợ triển lãm tiêu dùng 2021'>
              <Option value='1'>Hội chợ triển lãm tiêu dùng 2021</Option>
              <Option value='2'>Hội chợ triển lãm tiêu dùng 2021</Option>
              <Option value='3'>Hội chợ triển lãm tiêu dùng 2021</Option>
            </Select>
          </div> */}
          <div className='section-col'>
            <div className='section flex-start mt-1rem'>
              <p className='heading-base'>Tình trạng đối soát</p>
              <div className='content'>
                <div className='checkbox'>
                  <Radio.Group
                    options={options}
                    onChange={onChangeStatus}
                    value={checkedStatus}
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
              <div className='ml-2rem'>
                <DatePicker
                  onClick={() => setIsCalendarFromOpen(!isCalendaFromOpen)}
                  style={{ position: 'relative' }}
                  value={
                    dateFrom
                      ? moment(new Date(dateFrom), 'DD MMM, YYYY')
                      : moment(new Date(dateFrom), 'DD MMM, YYYY')
                  }
                  defaultValue={moment(new Date(dateFrom), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(
                    new Date(dateFrom),
                    'DD MMM, YYYY'
                  )}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                />
                {isCalendaFromOpen && (
                  <Calendar
                    setIsCalendarOpen={setIsCalendarFromOpen}
                    setDate={setDateFrom}
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
                  onClick={() => setIsCalendarToOpen(true)}
                  style={{ position: 'relative' }}
                  defaultValue={moment(new Date(dateTo), 'DD MMM, YYYY')}
                  value={
                    dateTo
                      ? moment(new Date(dateTo), 'DD MMM, YYYY')
                      : moment(new Date(dateTo), 'DD MMM, YYYY')
                  }
                  defaultPickerValue={moment(new Date(dateTo), 'DD MMM, YYYY')}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                />
                {isCalendarToOpen && (
                  <Calendar
                    setIsCalendarOpen={setIsCalendarToOpen}
                    setDate={setDateTo}
                    onClickOutside={() => {
                      setIsCalendarToOpen(false)
                    }}
                  />
                )}
              </div>
            </div>
            <button onClick={handleFilter} className='btn-filter'>
              Lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketCheck
