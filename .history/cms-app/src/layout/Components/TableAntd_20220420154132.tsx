import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import useDebounce from '../../hooks/useDebounce'
import { Ticket } from '../Main/Home'
import DropdownAntd from './DropdownAntd'

export interface ITableAntdProps {
  ticketsData: Ticket | undefined | any
  searchValue: string | any
  isManage: boolean
  checkedListGate?: any
}

const TableAntd: React.FunctionComponent<ITableAntdProps> = (
  props: ITableAntdProps
) => {
  const debounceSearch: any = useDebounce(props.searchValue, 400)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(6)

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
        const result = dateUse.toDate().toLocaleDateString('vi-VN')
        return <div>{result}</div>
      },
    },
    {
      key: '7',
      title: 'Ngày xuất vé',
      dataIndex: 'dateRelease',
      render: (dateRelease: any) => {
        const result = dateRelease.toDate().toLocaleDateString('vi-VN')
        return <div>{result}</div>
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
          return <DropdownAntd docId={record.id} />
        } else {
          return <div style={{ minWidth: '14px' }}></div>
        }
      },
    },
  ]
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
  const [tableData, setTableData] = useState<Ticket>()
  useEffect(() => {
    if (debounceSearch) {
      setTableData(
        props.ticketsData.filter((item: Ticket) =>
          item.ticketId.includes(debounceSearch)
        )
      )
    }
    // var studentCourses = [
    //   { id: 210, courses: 'Biology Physics Math' },
    //   { id: 211, courses: 'History Physics ComputerScience' },
    //   { id: 212, courses: 'Arts Language Biology Chemistry Physics' },
    //   { id: 213, courses: 'Chemistry Statistics Math' },
    //   { id: 214, courses: 'Biology Chemistry Physics Arts' },
    // ]
    // var filtersArray = ['Biology', 'Physics', 'Chemistry', 'Arts']
    // var filteredArray = studentCourses.filter(function (element) {
    //   var courses = element.courses.split(' ')
    //   return (
    //     courses.filter(function (course) {
    //       return filtersArray.indexOf(course) > -1
    //     }).length === filtersArray.length
    //   )
    // })

    // props.ticketsData.filter(function (element: any) {
    //   var courses = element.courses.split(' ')
    //   return (
    //     courses.filter(function (course: any) {
    //       return props.checkedListGate.indexOf(course) > -1
    //     }).length === props.checkedListGate.length
    //   )
    // })
  }, [debounceSearch, props.ticketsData, props.checkedListGate])
  console.log(props.ticketsData)
  return (
    <Table
      className={props.isManage ? 'table-manage' : 'table-check'}
      rowKey='id'
      columns={props.isManage ? columnsManage : columnsCheck}
      dataSource={debounceSearch.length ? tableData : props.ticketsData}
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
  )
}

export default TableAntd
