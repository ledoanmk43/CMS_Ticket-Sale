import React, { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'
import { Table, Modal, Checkbox, DatePicker, Radio, Button } from 'antd'
import Calendar from '../Components/Calendar'

import { Ticket } from './Home'
import DropdownAntd from '../Components/DropdownAntd'
import useDebounce from '../../hooks/useDebounce'
import { CSVLink, CSVDownload } from 'react-csv'
import { GoPrimitiveDot } from 'react-icons/go'
import moment from 'moment'
import dateFormat from 'dateformat'
import { Timestamp } from 'firebase/firestore'

export interface ITicketManageProps {
  ticketsData: Ticket | undefined | any
}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (
  props: ITicketManageProps
) => {
  const CheckboxGroup = Checkbox.Group
  const columnsManage = [
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
    },
    {
      key: 'action',
      render: (record: any) => {
        if (record.status === 'ready') {
          return <DropdownAntd docId={record.id} />
        } else {
          return <div style={{ minWidth: '14px' }}></div>
        }
      },
    },
  ]
  const options = [
    { label: 'Tất cả', value: '' },
    { label: 'Đã sử dụng', value: 'used' },
    { label: 'Chưa sử dụng', value: 'ready' },
    { label: 'Hết hạn', value: 'expired' },
  ]

  const plainOptionsGates: string[] = [
    'Cổng 1',
    'Cổng 2',
    'Cổng 3',
    'Cổng 4',
    'Cổng 5',
  ]
  const [tableData, setTableData] = useState<Ticket>()
  const [defaultData, setDefaultData] = useState<any>()

  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearch: any = useDebounce(searchValue, 400)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)
  //Date checking
  const [dateFrom, setDateFrom] = useState<any>(new Date())
  const [dateTo, setDateTo] = useState<any>(new Date())
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

  const [filterValue, setFilterValue] = useState<any>()
  const handleFilter = () => {
    if (checkedStatus !== '') {
      setFilterValue(
        checkedListGate.map((gate: any, index: number) => {
          return {
            dateFrom: Timestamp.fromDate(dateFrom),
            dateTo: Timestamp.fromDate(dateTo),
            status: checkedStatus,
            gate: checkedListGate[index],
          }
        })
      )
    } else {
      setFilterValue(checkedListGate)
    }
    setIsOpenModal(false)
  }

  //CSV export
  const headers = [
    { label: 'STT', key: 'id' },
    { label: 'Booking Code', key: 'bookingId' },
    { label: 'Số vé', key: 'ticketId' },
    { label: 'Tình trạng sử dụng', key: 'status' },
    { label: 'Ngày sử dụng', key: 'dateUse' },
    { label: 'Ngày xuất vé', key: 'dateRelease' },
    { label: 'Cổng check-in', key: 'gate' },
  ]
  const [dataCSV, setDataCSV] = useState<any>()
  const handleExport = () => {
    setDataCSV(debounceSearch.length ? tableData : defaultData)
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
                JSON.stringify(item.gate) ===
                  JSON.stringify(filterValue[i].gate) &&
                JSON.stringify(item.status) ===
                  JSON.stringify(filterValue[i].status) &&
                new Date(item.dateUse) >= new Date(filterValue[i].dateFrom) &&
                new Date(item.dateUse) <= new Date(filterValue[i].dateTo)
              ) {
                return item
              }
              console.log(
                'nồ ',
                new Date(item.dateUse).toLocaleDateString('en-us')
              )
            }
          })
        )
      } else {
        //ngược lại
        setDefaultData(
          props.ticketsData.filter((item: Ticket) => {
            for (let i = 0; i < filterValue.length; i++) {
              if (
                JSON.stringify(item.gate) === JSON.stringify(filterValue[i]) &&
                new Date(item.dateUse) >= new Date(filterValue[i].dateFrom) &&
                new Date(item.dateUse) <= new Date(filterValue[i].dateTo)
              ) {
                return item
              }
              console.log(
                'nồ ',
                new Date(new Date(item.dateUse).toLocaleDateString('en-us'))
              )
            }
          })
        )
      }
    } else {
      setDefaultData(props.ticketsData)
    }
  }, [debounceSearch, props.ticketsData, filterValue])
  // console.log('dateFrom nè', Timestamp.fromDate(dateFrom))
  // console.log('dateTo nè', Timestamp.fromDate(dateTo))
  console.log('dateFrom nè', new Date(dateFrom))
  console.log('dateTo nè', new Date(dateTo))

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
            {defaultData && (
              <CSVLink
                data={dataCSV ? dataCSV : defaultData}
                filename={`Quản lý vé - ${dateFormat(
                  new Date().toLocaleString('en-us'),
                  'dd/mm/yyyy (hhgMM:s TT)'
                )}`}
                onClick={handleExport}
                headers={headers}
                target='_blank'
                className='btn-ticket export'
              >
                Xuất file{' (.csv)'}
              </CSVLink>
            )}
          </div>
        </div>
        <Table
          className='table table-manage'
          rowKey='id'
          columns={columnsManage}
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
        {isOpenModal && (
          <Modal
            visible={isOpenModal}
            centered
            title='Lọc vé'
            closable={false}
            okText='Lọc'
            footer={[
              <button onClick={handleFilter} className='btn-filter-primary'>
                Lọc
              </button>,
            ]}
            maskClosable={true}
          >
            <div className='date-picker'>
              <div className='from'>
                <p className='heading-base'>Từ ngày</p>
                <DatePicker
                  onClick={() => setIsCalendarFromOpen(!isCalendaFromOpen)}
                  style={{ position: 'relative' }}
                  // defaultValue={moment(new Date(dateFrom), 'DD MMM, YYYY')}
                  // value={dateFrom}
                  defaultPickerValue={moment(
                    new Date(dateFrom),
                    'DD MMM, YYYY'
                  )}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                />
                {isCalendaFromOpen && (
                  <Calendar
                    setDate={setDateFrom}
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
                  // defaultValue={moment(new Date(dateTo), 'DD MMM, YYYY')}
                  // value={
                  //   dateFrom
                  //     ? dateFrom
                  //     : moment(new Date(dateTo), 'DD MMM, YYYY')
                  // }
                  defaultPickerValue={moment(new Date(dateTo), 'DD MMM, YYYY')}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                />
                {isCalendarToOpen && (
                  <Calendar
                    setDate={setDateTo}
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
                value={checkedStatus}
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
