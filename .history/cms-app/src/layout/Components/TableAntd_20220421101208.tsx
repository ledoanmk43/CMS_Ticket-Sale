import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import useDebounce from '../../hooks/useDebounce'
import { Ticket } from '../Main/Home'
import DropdownAntd from './DropdownAntd'

export interface ITableAntdProps {
  ticketsData: Ticket | undefined | any
  searchValue: string | any
  checkedListGate?: any
}

const TableAntd: React.FunctionComponent<ITableAntdProps> = (
  props: ITableAntdProps
) => {
  const debounceSearch: any = useDebounce(props.searchValue, 400)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)

  const [defaultData, setDefaultData] = useState<any>()

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

  const [tableData, setTableData] = useState<Ticket>()
  useEffect(() => {
    if (debounceSearch) {
      setTableData(
        props.ticketsData.filter((item: Ticket) =>
          item.ticketId.includes(debounceSearch)
        )
      )
    }
    if (props.checkedListGate.length >= 1) {
      setDefaultData(
        props.ticketsData.filter((item: Ticket) => {
          for (let i = 0; i < props.checkedListGate.length; i++) {
            if (
              JSON.stringify(item.gate) ===
              JSON.stringify(props.checkedListGate[i])
            ) {
              return item
            }
          }
        })
      )
    } else {
      setDefaultData(props.ticketsData)
    }
  }, [debounceSearch, props.ticketsData, props.checkedListGate])

  return (
    <Table
      className='table-manage'
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
  )
}

export default TableAntd
