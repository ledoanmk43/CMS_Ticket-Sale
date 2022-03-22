import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
// import { FiFilter } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'

import { Table, Modal, Checkbox, DatePicker } from 'antd'

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
  },
  {
    key: '5',
    title: 'Ngày hết hạn',
    dataIndex: 'dateEnd',
  },
  {
    key: '6',
    title: 'Giá vé (VNĐ/vé)',
    dataIndex: 'ticketPrice',
    render: (packageName: string) => {
      let price=''
      switch (packageName) {
        case 'Gói gia đình':
          price = '90.000'
          break
        case 'Gói sự kiện':
          price = '20.000'
          break
        default:
          price = '90.000'
          break
      }
      return(<a> {price</a>)
    }
  },
  {
    key: '7',
    title: 'Giá combo (VNĐ/combo)',
    dataIndex: 'comboPrice',
  },
  {
    key: '8',
    title: 'Tình trạng ',
    dataIndex: 'packageStatus',
    render: (status: string) => {
      let color = ''
      let statusName = ''
      let bg = ''
      switch (status) {
        case 'ready':
          color = '#03AC00'
          statusName = 'Đang áp dụng'
          bg = '#DEF7E0'
          break
        case 'expired':
          color = '#FD5959'
          statusName = 'Tắt'
          bg = '#F8EBE8'
          break
        default:
          color = '#03AC00'
          statusName = 'Đang áp dụng'
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
    key: 'action',
    render: (record: any) => (
      <div>
        <a> Cập nhật</a>
      </div>
    ),
  },
]

const data = [
  {
    // key: '1',
    id: '1',
    packageId: 'ALTA111',
    packageName: 'Gói gia đình',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    ticketPrice:''
    status: 'used',
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '2',
    packageId: 'ALTA112',
    packageName: 'Gói gia đình',
    status: 'ready',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '3',
    packageId: 'ALTA113',
    packageName: 'Gói sự kiện',
    status: 'expired',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    gate: 'Cổng 4',
  },
  {
    // key: '1',
    id: '4',
    packageId: 'ALTA114',
    packageName: 'Gói gia đình',
    status: 'used',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '5',
    packageId: 'ALTA115',
    packageName: 'Gói sự kiện',
    status: 'ready',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '6',
    packageId: 'ALTA116',
    packageName: 'Gói gia đình',
    status: 'used',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    gate: 'Cổng 2',
  },
  {
    // key: '1',
    id: '7',
    packageId: 'ALTA117',
    packageName: 'Gói sự kiện',
    status: 'expired',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    gate: 'Cổng 1',
  },
  {
    // key: '1',
    id: '8',
    packageId: 'ALTA118',
    packageName: 'Gói sự kiện',
    status: 'used',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    gate: 'Cổng 4',
  },
]
const CheckboxGroup = Checkbox.Group

const plainOptionsStatus: string[] = ['Đã sử dụng', 'Chưa sử dụng', 'Hết hạn']
const defaultCheckedListStatus = ['Đã sử dụng']

const plainOptionsGates: string[] = [
  'Cổng 1',
  'Cổng 2',
  'Cổng 3',
  'Cổng 4',
  'Cổng 5',
]
const defaultCheckedListGate = ['Cổng 1']

export interface IServicePackProps {}

const ServicePack: React.FunctionComponent<IServicePackProps> = (props) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  return (
    <div className='main'>
      <div className='container'>
        <p className='title_xl'> Danh sách gói vé</p>
        <div className='section'>
          <div className='section-search'>
            <input
              className='section-search-input'
              type='text'
              placeholder='Tìm bằng tên gói vé'
            />
            <SearchOutlined className='header-search-icon' />
          </div>
          <div className='filter'>
            <button className='btn-ticket export'>Xuất file </button>
            <button
              onClick={() => {
                setIsOpenModal(!isOpenModal)
                console.log(isOpenModal)
              }}
              className='btn-ticket'
            >
              Thêm gói vé
            </button>
          </div>
        </div>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={data}
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
        {/* {isOpenModal && (
          <Modal
            centered
            title='Lọc vé'
            closable={false}
            visible={isOpenModal}
            onOk={() => setIsOpenModal(false)}
            okText='Lọc'
            cancelButtonProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <div className='date-picker'>
              <div className='from'>
                <p className='heading-base'>Từ ngày</p>
                <DatePicker
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD MMM, YYYY'}
                  allowClear={false}
                />
              </div>
              <div className='to'>
                <p className='heading-base'>Đến ngày</p>
                <DatePicker
                  defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                  defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                  format={'DD MMM, YYYY'}
                  allowClear={false}
                />
              </div>
            </div>

            <div className='status'>
              <p className='heading-base'>Tình trạng sử dụng</p>
              <Checkbox
                style={{ marginRight: '8px' }}
                indeterminate={indeterminateStatus}
                onChange={onCheckAllChangeStatus}
                checked={checkAllStatus}
              >
                Tất cả
              </Checkbox>
              <CheckboxGroup
                options={plainOptionsStatus}
                value={checkedListStatus}
                onChange={onChangeStatus}
              />
            </div>
            <div className='gate'>
              <p className='heading-base'>Cổng Check-in</p>
              <div className='flex-half'>
                <Checkbox
                  style={{ marginRight: '8px' }}
                  indeterminate={indeterminateGate}
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
        )} */}
      </div>
    </div>
  )
}

export default ServicePack
