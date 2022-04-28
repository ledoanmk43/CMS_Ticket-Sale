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
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../App'
import { Packages } from './Home'
import useDebounce from '../../hooks/useDebounce'
import moment from 'moment'
import Calendar from '../Components/Calendar'
import { CSVLink } from 'react-csv'
import dateFormat from 'dateformat'

export interface IServicePackProps {
  packagesData: Packages | undefined | any
}

const ServicePack: React.FunctionComponent<IServicePackProps> = (
  props: IServicePackProps
) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<any>(false)
  const [packUpdate, setPackUpdate] = useState<Packages | any>()
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
        return <div>{dateBegin}</div>
      },
    },
    {
      key: '5',
      title: 'Ngày hết hạn',
      dataIndex: 'dateEnd',
      render: (dateEnd: any) => {
        return <div>{dateEnd}</div>
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
      render: (packageStatus: string) => {
        let color = ''
        let status = ''
        let bg = ''
        if (packageStatus === 'Đang áp dụng' && packageStatus !== null) {
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
          <button
            onClick={() => {
              setPackageStatusEdit(record.packageStatus)
              setPackUpdate(record)
              setIsOpenModalEdit(true)
            }}
            className='edit'
          >
            <FiEdit />
            Cập nhật
          </button>
        )
      },
    },
  ]

  const [isCalendaFromOpen, setIsCalendarFromOpen] = useState<boolean>(false)
  const [isCalendarToOpen, setIsCalendarToOpen] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)

  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearch: any = useDebounce(searchValue, 400)
  const [tableData, setTableData] = useState<Packages>()

  const onTimeFromChange = (time: any, timeString: any) => {
    console.log(time, timeString)
  }
  const options = [
    { value: true, label: 'Đang áp dụng' },
    { value: false, label: 'Tắt' },
  ]
  //Add
  const [packageNameAdd, setPackageNameAdd] = useState<any>()
  const [packageStatusAdd, setPackageStatusAdd] = useState<any>()
  const [ticketPriceAdd, setTicketPriceAdd] = useState<any>()
  const [comboPriceAdd, setComboPriceAdd] = useState<any>()
  //Edit
  const [packageNameEdit, setPackageNameEdit] = useState<string>()
  const [packageStatusEdit, setPackageStatusEdit] = useState<boolean>()
  const [ticketPriceEdit, setTicketPriceEdit] = useState<number>()
  const [comboPriceEdit, setComboPriceEdit] = useState<number>()
  const handleAddPack = async () => {
    const docData = {
      id:
        props.packagesData.length > 0
          ? props.packagesData[props.packagesData.length - 1].id + 1
          : 1,
      packageId: 'ALT20210501',
      packageName: packageNameAdd,
      dateBegin: Timestamp.fromDate(new Date()),
      dateEnd: Timestamp.fromDate(
        new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      ),
      ticketPrice: ticketPriceAdd,
      comboPrice: comboPriceAdd,
      packageStatus: packageStatusAdd,
    }

    await addDoc(collection(db, 'ticketpacks'), docData)
    setPackageNameAdd(undefined)
    setTicketPriceAdd(undefined)
    setComboPriceAdd(undefined)
    setPackageStatusAdd(packageStatusAdd)
    setIsOpenModalAdd(false)
  }
  const handleEditPack = async () => {
    try {
      const ticketQuery = query(
        collection(db, 'ticketpacks'),
        where('id', '==', packUpdate.id)
      )
      const querySnapshot = await getDocs(ticketQuery)
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            id: packUpdate.id,
            packageId: 'ALT20210501',
            packageName: packageNameEdit
              ? packageNameEdit
              : packUpdate.packageName,
            dateBegin: Timestamp.fromDate(new Date()),
            dateEnd: Timestamp.fromDate(
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            ),
            ticketPrice: ticketPriceEdit
              ? ticketPriceEdit
              : packUpdate.ticketPrice,
            comboPrice: comboPriceEdit ? comboPriceEdit : packUpdate.comboPrice,
            packageStatus: packageStatusEdit,
          })
        })

        setPackageNameEdit(undefined)
        setTicketPriceEdit(undefined)
        setComboPriceEdit(undefined)
        setPackageStatusEdit(packUpdate.packageStatus)
      }
    } catch (e) {
      console.log(e)
    }
    setIsOpenModalEdit(false)
  }

  //CSV export
  const headers = [
    { label: 'STT', key: 'id' },
    { label: 'Mã gói', key: 'packageId' },
    { label: 'Tên gói vé', key: 'packageName' },
    { label: 'Ngày áp dụng', key: 'dateBegin' },
    { label: 'Ngày hết hạn', key: 'dateEnd' },
    { label: 'Giá vé (VNĐ/vé)', key: 'ticketPrice' },
    { label: 'Giá combo (VNĐ/combo)', key: 'comboPrice' },
    { label: 'Tình trạng', key: 'packageStatus' },
  ]
  const [dataCSV, setDataCSV] = useState<any>()
  const handleExport = () => {
    setDataCSV(debounceSearch.length ? tableData : props.packagesData)
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
            {props.packagesData && (
              <CSVLink
                data={dataCSV ? dataCSV : props.packagesData}
                filename={`Quản lý gói vé - ${dateFormat(
                  new Date().toLocaleString('en-us'),
                  'dd/mm/yyyy (hh MM TT)'
                )}`}
                onClick={handleExport}
                headers={headers}
                target='_blank'
                className='btn-ticket export'
              >
                Xuất file{' (.csv)'}
              </CSVLink>
            )}
            <button
              onClick={() => {
                setIsOpenModalAdd(!isOpenModalAdd)
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
            onOk={handleEditPack}
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
                placeholder={packUpdate.packageName}
                className='form-input'
                defaultValue={packUpdate.packageName}
                onChange={(e: any) => setPackageNameEdit(e.target.value)}
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
                  defaultValue={packUpdate.ticketPrice}
                  onChange={(e: any) => setTicketPriceEdit(e.target.value)}
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
                  defaultValue={packUpdate.comboPrice}
                  onChange={(e: any) => setComboPriceEdit(e.target.value)}
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
                  options={options}
                  defaultValue={packUpdate.packageStatus}
                  onChange={setPackageStatusEdit}
                  style={{
                    maxWidth: '160px',
                    backgroundColor: 'transparent !important',
                  }}
                ></Select>
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
                  options={options}
                  defaultValue={options[0].value}
                  onChange={setPackageStatusAdd}
                  style={{
                    maxWidth: '160px',
                    backgroundColor: 'transparent !important',
                  }}
                ></Select>
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
