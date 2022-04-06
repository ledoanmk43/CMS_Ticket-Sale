import React, { useState, useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiEdit } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'

import { Table, Modal, Checkbox, DatePicker } from 'antd'
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../App'

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
      const result = dateBegin
        .toDate()
        .toLocaleString('vi-VN', 'DD/MM/YYYY, HH:mm:ss')

      return <div>{result}</div>
    },
  },
  {
    key: '5',
    title: 'Ngày hết hạn',
    dataIndex: 'dateEnd',
    render: (dateEnd: any) => {
      const result = dateEnd.toDate().toLocaleString('vi-VN')
      return <div>{result}</div>
    },
  },
  {
    key: '6',
    title: 'Giá vé (VNĐ/vé)',
    dataIndex: 'ticketPrice',
    render: (ticketPrice: number) => {
      let price = ticketPrice
      return <div style={{ paddingRight: '1rem' }}>{price} VNĐ </div>
    },
  },
  {
    key: '7',
    title: 'Giá combo (VNĐ/combo)',
    dataIndex: 'comboPrice',
    render: (comboPrice: number) => {
      let price = comboPrice
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

export interface IServicePackProps {}

const ServicePack: React.FunctionComponent<IServicePackProps> = (props) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
  const [packagesData, setPackagesData] = useState()

  useEffect(() => {
    const ticketpacksCollectionRef = collection(db, 'ticketpacks')
    const getAllTicketPacks = async () => {
      try {
        await getDocs(ticketpacksCollectionRef).then((snapshot) => {
          const packs: any = []
          snapshot.forEach((doc) => {
            packs.push(doc.data())
          })
          setPackagesData(packs.sort((a: any, b: any) => a.id - b.id))
        })
      } catch (err) {
        console.error(err)
      }
    }
    getAllTicketPacks()
  }, [])

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
            />
            <SearchOutlined className='header-search-icon' />
          </div>
          <div className='filter'>
            <button className='btn-ticket export'>Xuất file </button>
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
          dataSource={packagesData}
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
