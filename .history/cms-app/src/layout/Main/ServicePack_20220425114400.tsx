import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiEdit } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'

import { Table, Modal, Checkbox, DatePicker, Select, TimePicker } from 'antd'
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  Timestamp,
  doc,
  addDoc,
} from 'firebase/firestore'
import { db } from '../../App'
import { Packages } from './Home'
import useDebounce from '../../hooks/useDebounce'
import moment from 'moment'
import Calendar from '../Components/Calendar'

export interface IServicePackProps {
  packagesData: Packages | undefined | any
}

const ServicePack: React.FunctionComponent<IServicePackProps> = (
  props: IServicePackProps
) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<any>(false)

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
        if (packageStatus) {
          color = '#03AC00'
          status = 'Đang áp dụng'
          bg = '#DEF7E0'
        } else {
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
      render: (record: any) => {
        return (
          <button onClick={() => setIsOpenModalEdit(true)} className='edit'>
            <FiEdit />
            Cập nhật
          </button>
        )
      },
    },
  ]
  const { Option } = Select
  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)

  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearch: any = useDebounce(searchValue, 400)
  const [tableData, setTableData] = useState<Packages>()

  const onTimeFromChange = (time: any, timeString: any) => {
    console.log(time, timeString)
  }
  const options = [
    { value: 'true', label: 'Đã sử dụng' },
    { value: 'false', label: 'Chưa sử dụng' },
  ]
  const [packageNameAdd, setPackageNameAdd] = useState<any>()
  const [packageStatusAdd, setPackageStatusAdd] = useState<boolean>()
  const [ticketPriceAdd, setTicketPriceAdd] = useState<any>()
  const [comboPriceAdd, setComboPriceAdd] = useState<any>()

  const handleAddPack = async () => {
    const docData = {
      id: props.packagesData[props.packagesData.length - 1].id + 1,
      packageId: 'ALT20210501',
      packageName: packageNameAdd,
      dateBegin: Timestamp.fromDate(new Date()),
      dateEnd: Timestamp.fromDate(new Date()),
      packageStatus: packageStatusAdd,
      ticketPrice: ticketPriceAdd,
      comboPrice: comboPriceAdd,
    }
    console.log('helo', packageStatusAdd)
    await addDoc(collection(db, 'ticketpacks'), docData)
    setIsOpenModalAdd(false)
  }
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
          dataSource={debounceSearch ? tableData : props.packagesData}
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
        {isOpenModalEdit && (
          <Modal
            centered
            title='Cập nhật thông tin gói vé'
            closable={false}
            visible={isOpenModalEdit}
            onOk={() => setIsOpenModalEdit(false)}
            onCancel={() => setIsOpenModalEdit(false)}
            okText='Lưu'
            cancelText='Huỷ'
            wrapClassName='modal'
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
            <div
              style={{
                marginTop: '-2rem',
                maxHeight: '50px',
              }}
              className='date-picker'
            >
              <div className='from' style={{ marginRight: '4rem' }}>
                <p className='heading-base'>Ngày áp dụng</p>
                <div
                  className='add-date'
                  style={{ display: 'flex', maxHeight: '50px' }}
                >
                  <DatePicker
                    onClick={() => setIsCalendarFromOpen(!isCalendaFromOpen)}
                    style={{ position: 'relative' }}
                    defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                    defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                  />
                  <TimePicker
                    className='time'
                    onChange={onTimeFromChange}
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                    style={{ marginLeft: '8px' }}
                  />
                  {isCalendaFromOpen && (
                    <Calendar
                      onClickOutside={() => {
                        setIsCalendarFromOpen(false)
                      }}
                    />
                  )}
                </div>
              </div>
              <div className='to'>
                <p className='heading-base'>Ngày hết hạn</p>
                <div style={{ display: 'flex', maxHeight: '50px' }}>
                  <DatePicker
                    onClick={() => setIsCalendarToOpen(!isCalendarToOpen)}
                    style={{ position: 'relative' }}
                    defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                    defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                  />
                  <TimePicker style={{ marginLeft: '8px' }} />
                  {isCalendarToOpen && (
                    <Calendar
                      onClickOutside={() => {
                        setIsCalendarToOpen(false)
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='price-form'>
              <p className='heading-base'>Giá vé áp dụng</p>
              <div className='price'>
                <input type='checkbox' placeholder='Nhập tên gói vé' />
                <p>Vé lẻ (vnđ/vé) với giá</p>
                <input
                  type='text'
                  placeholder='Giá vé'
                  className='price-input'
                />
                <p>/ vé</p>
              </div>
              <div className='price'>
                <input type='checkbox' placeholder='Nhập tên gói vé' />
                <p>Combo vé với giá</p>
                <input
                  type='text'
                  placeholder='Giá vé'
                  className='price-input'
                />
                <p>/</p>
                <input
                  type='text'
                  placeholder='Giá vé'
                  className='price-input'
                  style={{ maxWidth: '72px' }}
                />
                <p> vé</p>
              </div>
            </div>
            <div className='package-input mt-3rem'>
              <p className='heading-base'>Tình trạng</p>
              <div className='select-status'>
                <Select
                  style={{
                    maxWidth: '160px',
                    backgroundColor: 'transparent !important',
                  }}
                  defaultValue='false'
                >
                  <Option value='false'>Đang sử dụng</Option>
                  <Option value='true'>Chưa sử dụng</Option>
                </Select>
              </div>
            </div>
            <div className='note'>
              <span style={{ color: '#FD5959', fontSize: '16px' }}>*</span>
              <p
                style={{
                  fontSize: '12px',
                  opacity: '0.4',
                  fontStyle: 'italic',
                  textIndent: '0.5rem',
                }}
              >
                là thông tin bắt buộc
              </p>
            </div>
          </Modal>
        )}
        {isOpenModalAdd && (
          <Modal
            centered
            title='Thêm gói vé'
            closable={false}
            visible={isOpenModalAdd}
            onOk={handleAddPack}
            onCancel={() => setIsOpenModalAdd(false)}
            okText='Lưu'
            cancelText='Huỷ'
            wrapClassName='modal'
          >
            <div className='package-input'>
              <p className='heading-base'>
                Tên gói vé <span style={{ color: '#FD5959' }}>*</span>
              </p>
              <input
                type='text'
                placeholder='Nhập tên gói vé'
                className='form-input'
                onChange={(e: any) => setPackageNameAdd(e.target.value)}
              />
            </div>
            <div
              style={{
                marginTop: '-2rem',
                maxHeight: '50px',
              }}
              className='date-picker'
            >
              <div className='from' style={{ marginRight: '4rem' }}>
                <p className='heading-base'>Ngày áp dụng</p>
                <div
                  className='add-date'
                  style={{ display: 'flex', maxHeight: '50px' }}
                >
                  <DatePicker
                    onClick={() => setIsCalendarFromOpen(!isCalendaFromOpen)}
                    style={{ position: 'relative' }}
                    defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                    defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                  />
                  <TimePicker
                    className='time'
                    onChange={onTimeFromChange}
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                    style={{ marginLeft: '8px' }}
                  />
                  {isCalendaFromOpen && (
                    <Calendar
                      onClickOutside={() => {
                        setIsCalendarFromOpen(false)
                      }}
                    />
                  )}
                </div>
              </div>
              <div className='to'>
                <p className='heading-base'>Ngày hết hạn</p>
                <div style={{ display: 'flex', maxHeight: '50px' }}>
                  <DatePicker
                    onClick={() => setIsCalendarToOpen(!isCalendarToOpen)}
                    style={{ position: 'relative' }}
                    defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                    defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                    format={'DD/MM/YYYY'}
                    allowClear={false}
                  />
                  <TimePicker style={{ marginLeft: '8px' }} />
                  {isCalendarToOpen && (
                    <Calendar
                      onClickOutside={() => {
                        setIsCalendarToOpen(false)
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='price-form'>
              <p className='heading-base'>Giá vé áp dụng</p>
              <div className='price'>
                <input type='checkbox' placeholder='Nhập tên gói vé' />
                <p>Vé lẻ (vnđ/vé) với giá</p>
                <input
                  type='text'
                  placeholder='Giá vé'
                  className='price-input'
                  onChange={(e: any) => setTicketPriceAdd(e.target.value)}
                />
                <p>/ vé</p>
              </div>
              <div className='price'>
                <input type='checkbox' placeholder='Nhập tên gói vé' />
                <p>Combo vé với giá</p>
                <input
                  type='text'
                  placeholder='Giá vé'
                  className='price-input'
                  onChange={(e: any) => setComboPriceAdd(e.target.value)}
                />
                <p>/</p>
                <input
                  type='text'
                  placeholder='Giá vé'
                  className='price-input'
                  style={{ maxWidth: '72px' }}
                />
                <p> vé</p>
              </div>
            </div>
            <div className='package-input mt-3rem'>
              <p className='heading-base'>Tình trạng</p>
              <div className='select-status'>
                <Select
                  onChange={(option) => setPackageStatusAdd(option)}
                  style={{
                    maxWidth: '160px',
                    backgroundColor: 'transparent !important',
                  }}
                  defaultValue={options[0]}
                  options={options}
                >
                  {/* <Option value='true'>Đang sử dụng</Option>
                  <Option value='false'>Chưa sử dụng</Option> */}
                </Select>
              </div>
            </div>
            <div className='note'>
              <span style={{ color: '#FD5959', fontSize: '16px' }}>*</span>
              <p
                style={{
                  fontSize: '12px',
                  opacity: '0.4',
                  fontStyle: 'italic',
                  textIndent: '0.5rem',
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
