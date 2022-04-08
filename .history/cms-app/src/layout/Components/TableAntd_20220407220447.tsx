import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { Ticket } from '../Main/Home'
import DropdownAntd from './DropdownAntd'

export interface ITableAntdProps {
  ticketsData: Ticket | undefined | any
  searchValue: string | null
  debounceSearch: any
}

const TableAntd: React.FunctionComponent<ITableAntdProps> = (
  props: ITableAntdProps
) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(6)

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
      // render: (record: any) => {
      //   console.log(record.status)
      //   if (record.status === 'ready') {
      //     return <div>Cổng 1</div>
      //   } else {
      //     return <div>-</div>
      //   }
      // },
    },
    {
      key: 'action',
      render: (record: any) => {
        if (record.status === 'ready') return <DropdownAntd docId={record.id} />
      },
    },
  ]
  const [tableData, setTableData] = useState()
  useEffect(() => {
    if (props.debounceSearch) {
      setTableData(
        props.ticketsData.filter(
          (item: Ticket) => item.ticketId === props.debounceSearch
        )
      )
    }
    return () => {}
  }, [props.debounceSearch])
  console.log(props.debounceSearch)
  return (
    <Table
      className='table-manage'
      rowKey='id'
      columns={columns}
      dataSource={props.ticketsData}
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
