import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiEdit } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'

import { Table, Modal, Checkbox, DatePicker, Select } from 'antd'
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../App'
import { Packages } from './Home'
import useDebounce from '../../hooks/useDebounce'
import moment from 'moment'
import Calendar from '../Components/Calendar'

const columns = [
  {
    key: '1',
    title: 'STT',
    dataIndex: 'id',
  },
  {
    key: '2',
    title: 'Mã gói',
    dataIndex: 'packageId',
  },
  {
    key: '3',
    title: 'Tên gói vé',
    dataIndex: 'packageName',
  },
  {
    key: '4',
    title: 'Ngày áp dụng',
    dataIndex: 'dateBegin',
    render: (dateBegin: any) => {
      const result = dateBegin.toDate().toLocaleString('en-GB')

      return <div>{result}</div>
    },
  },
  {
    key: '5',
    title: 'Ngày hết hạn',
    dataIndex: 'dateEnd',
    render: (dateEnd: any) => {
      const result = dateEnd.toDate().toLocaleString('en-GB')
      return <div>{result}</div>
    },
  },
  {
    key: '6',
    title: 'Giá vé (VNĐ/vé)',
    dataIndex: 'ticketPrice',
    render: (ticketPrice: number) => {
      const price = ticketPrice
      return <div style={{ paddingRight: '1rem' }}>{price} VNĐ </div>
    },
  },
  {
    key: '7',
    title: 'Giá combo (VNĐ/combo)',
    dataIndex: 'comboPrice',
    render: (comboPrice: number) => {
      const price = comboPrice
      return <div style={{ paddingRight: '1rem' }}>{price} VNĐ/4 vé </div>
    },
  },
  {
    key: '8',
    title: 'Tình trạng ',
    dataIndex: 'packageStatus',
    render: (packageStatus: boolean) => {
      let color = ''
      let status = ''
      let bg = ''
      switch (packageStatus) {
        case true:
          color = '#03AC00'
          status = 'Đang áp dụng'
          bg = '#DEF7E0'
          break
        default:
          color = '#FD5959'
          status = 'Tắt'
          bg = '#F8EBE8'
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
          <GoPrimitiveDot className='icon' /> {status}
        </div>
      )
    },
  },
  {
    key: 'action',
    render: (record: any) => (
      <button className='edit'>
        <FiEdit />
        Cập nhật
      </button>
    ),
  },
]

export interface IServicePackProps {
  packagesData: Packages | undefined | any
}

const ServicePack: React.FunctionComponent<IServicePackProps> = (
  props: IServicePackProps
) => {
  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)

  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearch: any = useDebounce(searchValue, 400)
  const [tableData, setTableData] = useState<Packages>()

  useEffect(() => {
    if (debounceSearch) {
      setTableData(
        props.packagesData.filter((item: Packages) =>
          item.packageName.toLowerCase().includes(debounceSearch.toLowerCase())
        )
      )
    }
  }, [debounceSearch])
  return (
    <div className='main h-base col'>
      <div className='container'>
        <p className='title_xl'> Danh sách gói vé</p>
        <div className='section'>
          <div className='section-search'>
            <input
              className='section-search-input'
              type='text'
              placeholder='Tìm bằng tên gói vé'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchOutlined className='header-search-icon' />
          </div>
          <div className='filter'>
            <button className='btn-ticket export'>Xuất file{' (.csv)'} </button>
            <button
              onClick={() => {
                setIsOpenModalAdd(!isOpenModalAdd)
                console.log(isOpenModalAdd)
              }}
              className='btn-ticket'
            >
              Thêm gói vé
            </button>
          </div>
        </div>
        <Table
          className='container-table'
          rowKey='id'
          columns={columns}
          dataSource={debounceSearch.length ? tableData : props.packagesData}
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
        {isOpenModalAdd && (
          <Modal
            centered
            title='Thêm gói vé'
            closable={false}
            visible={isOpenModalAdd}
            onOk={() => setIsOpenModalAdd(false)}
            onCancel={() => setIsOpenModalAdd(false)}
            okText='Lưu'
            cancelText='Huỷ'
          >
            <div className='package-input'>
              <p className='heading-base'>
                Tên gói vé <span style={{ color: '#FD5959' }}>*</span>
              </p>
              <input
                type='text'
                placeholder='Nhập tên gói vé'
                className='form-input'
              />
            </div>
            <div className='date-picker'>
              <div className='from'>
                <p className='heading-base'>Ngày áp dụng</p>
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
                <p className='heading-base'>Ngày hết hạn</p>
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
            <div className='price-input'>
              <p className='heading-base'>Giá vé áp dụng</p>
              <div className='price'>
                <input
                  type='checkbox'
                  placeholder='Nhập tên gói vé'
                  className='input'
                />
                <p>Vé lẻ (vnđ/vé) với giá</p>
              </div>
              <div className='price'>
                <input
                  type='checkbox'
                  placeholder='Nhập tên gói vé'
                  className='input'
                />
                <p>Combo vé với giá</p>
              </div>
            </div>
            <div className='package-input'>
              <p className='heading-base'>Tình trạng</p>
              <div className='select-status'>
                <Select defaultValue='Đang sử dụng'></Select>
              </div>
            </div>
            <div className='row mt-1rem'>
              <span style={{ color: '#FD5959', fontSize: '16px' }}>*</span>
              <p
                style={{
                  fontSize: '12px',
                  opacity: '0.4',
                  fontStyle: 'italic',
                  textIndent: '1px',
                }}
              >
                là thông tin bắt buộc
              </p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ServicePack
