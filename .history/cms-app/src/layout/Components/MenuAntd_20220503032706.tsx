import { Menu } from 'antd'
import React, { useState } from 'react'
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../App'
export interface IMenuAntdProps {
  docId: any
}

const MenuAntd: React.FunctionComponent<IMenuAntdProps> = (
  props: IMenuAntdProps
) => {
  const changeStatus = async () => {
    try {
      const ticketQuery = query(
        collection(db, 'tickets'),
        where('id', '==', props.docId)
      )
      const querySnapshot = await getDocs(ticketQuery)

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            status: 'used',
          })
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const [modalChangeDate, setModalChangeDate] = useState<any>()

  const changeDateUse = async () => {
    try {
      const ticketQuery = query(
        collection(db, 'tickets'),
        where('id', '==', props.docId)
      )
      const querySnapshot = await getDocs(ticketQuery)

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            dateUse: 'used',
          })
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Menu className='menu'>
      <Menu.Item onClick={changeStatus} key='1'>
        Sử dụng vé
      </Menu.Item>
      <Menu.Item onClick={setModalChangeDate(true)} key='2'>
        Đổi ngày sử dụng
      </Menu.Item>
    </Menu>
    {
    modalChangeDate && (
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
                {isCalendaFromOpen && (
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
  )
}

export default MenuAntd
