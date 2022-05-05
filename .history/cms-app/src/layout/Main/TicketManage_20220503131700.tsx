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
import {
  collection,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../App'

export interface ITicketManageProps {
  ticketsData: Ticket | undefined | any
}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (
  props: ITicketManageProps
) => {
  const CheckboxGroup = Checkbox.Group
  const [modalChangeDate, setModalChangeDate] = useState<boolean>(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [dataUpdate, setDataUpdate] = useState<any>()
  const [dateUpdate, setDateUpdate] = useState<any>(new Date())
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
      key: '7',
      title: 'Ngày xuất vé',
      dataIndex: 'dateRelease',
      render: (dateRelease: any) => {
        const result = dateRelease.toDate().toLocaleDateString('en-GB')
        return (
          <div style={{ textAlign: 'right', paddingRight: '1rem' }}>
            {result}
          </div>
        )
      },
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
          return (
            <div onClick={() => setDataUpdate(record)}>
              <DropdownAntd
                setModalChangeDate={setModalChangeDate}
                docTicketId={record.ticketId}
                docEventName={record.eventName}
                docId={record.id}
              />
            </div>
          )
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

  const [isCalendarFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
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
  const changeDateUse = async () => {
    try {
      const ticketQuery = query(
        collection(db, 'tickets'),
        where('id', '==', dataUpdate.id)
      )
      const querySnapshot = await getDocs(ticketQuery)
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            dateUse: dateUpdate,
          })
        })
      }
    } catch (e) {
      console.log(e)
    }
    setDateUpdate(new Date(dataUpdate.dateUse))
    setModalChangeDate(false)
  }
  console.log('new Date(dateUpdate)', dateUpdate)
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
      setFilterValue(
        checkedListGate.map((gate: any, index: number) => {
          return {
            dateFrom: Timestamp.fromDate(dateFrom),
            dateTo: Timestamp.fromDate(dateTo),
            gate: checkedListGate[index],
          }
        })
      )
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
        //1 of 3 cases
        setDefaultData(
          props.ticketsData.filter((item: Ticket) => {
            for (let i = 0; i < filterValue.length; i++) {
              if (
                JSON.stringify(item.gate) ===
                  JSON.stringify(filterValue[i].gate) &&
                JSON.stringify(item.status) ===
                  JSON.stringify(filterValue[i].status) &&
                item.dateUse >= filterValue[i].dateFrom &&
                item.dateUse <= filterValue[i].dateTo
              ) {
                return item
              }
            }
          })
        )
      } else {
        //check all
        setDefaultData(
          props.ticketsData.filter((item: Ticket) => {
            for (let i = 0; i < filterValue.length; i++) {
              if (
                JSON.stringify(item.gate) ===
                  JSON.stringify(filterValue[i].gate) &&
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
    setDateUpdate({ ...dateUpdate, dateUse: new Date() })
  }, [debounceSearch, props.ticketsData, filterValue])
  console.log('dateUpdate ', dateUpdate.dateUse)
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
                  onClick={() => setIsCalendarFromOpen(!isCalendarFromOpen)}
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
                {isCalendarFromOpen && (
                  <Calendar
                    setIsCalendarOpen={setIsCalendarFromOpen}
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
        {modalChangeDate && (
          <Modal
            visible={modalChangeDate}
            centered
            title='Đổi ngày sử dụng vé'
            closable={false}
            onOk={changeDateUse}
            okText='Lưu'
            onCancel={() => setModalChangeDate(false)}
            cancelText='Huỷ'
            wrapClassName='modal-small'
            maskClosable={true}
          >
            <div className='flex row change-date'>
              <p className='heading-base'>Số vé</p>
              <p className='heading-base'>{dataUpdate.ticketId}</p>
            </div>
            <div className='flex row change-date'>
              <p className='heading-base'>Tên sự kiện</p>
              <p className='heading-base'>{dataUpdate.eventName}</p>
            </div>
            <div className='flex row change-date'>
              <p className='heading-base'>Hạn sử dụng</p>
              <DatePicker
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                style={{ position: 'relative' }}
                value={
                  dataUpdate.dateUse === new Date()
                    ? moment(dateUpdate, 'DD MMM, YYYY')
                    : moment(dataUpdate.dateUse, 'DD MMM, YYYY')
                }
                defaultValue={moment(new Date(dateUpdate), 'DD MMM, YYYY')}
                defaultPickerValue={moment(
                  new Date(dateUpdate),
                  'DD MMM, YYYY'
                )}
                format={'DD/MM/YYYY'}
                allowClear={false}
              />
              {isCalendarOpen && (
                <Calendar
                  setIsCalendarOpen={setIsCalendarOpen}
                  setDate={setDateUpdate}
                  onClickOutside={() => {
                    setIsCalendarOpen(false)
                  }}
                />
              )}
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default TicketManage
