import { Calendar, DatePicker, Menu, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
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
import moment from 'moment'
export interface IMenuAntdProps {
  onClickOutside: () => void
  docId: any
  setIsDropDownOpen: any
  docTicketId: any
  docEventName: any
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

  const [modalChangeDate, setModalChangeDate] = useState<boolean>(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  const [dateUpdate, setDateUpdate] = useState<any>(new Date())

  const changeDateUse = async () => {
    // try {
    //   const ticketQuery = query(
    //     collection(db, 'tickets'),
    //     where('id', '==', props.docId)
    //   )
    //   const querySnapshot = await getDocs(ticketQuery)
    //   if (!querySnapshot.empty) {
    //     querySnapshot.forEach((doc) => {
    //       updateDoc(doc.ref, {
    //         dateUse: 'used',
    //       })
    //     })
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
    setModalChangeDate(false)
  }
  const ref = useRef<any>(null)
  const { onClickOutside } = props

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])
  return (
    <Menu className='menu'>
      <Menu.Item onClick={changeStatus} key='1'>
        S??? d???ng v??
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setModalChangeDate(true)
          props.setIsDropDownOpen(false)
        }}
        key='2'
      >
        ?????i ng??y s??? d???ng
      </Menu.Item>
      {modalChangeDate && (
        <Modal
          visible={modalChangeDate}
          centered
          title='?????i ng??y s??? d???ng v??'
          closable={false}
          onOk={changeDateUse}
          okText='L??u'
          onCancel={() => setModalChangeDate(false)}
          cancelText='Hu???'
          wrapClassName='modal-small'
          maskClosable={true}
        >
          <div className='flex row change-date'>
            <p className='heading-base'>S??? v??</p>
            <p className='heading-base'>{props.docTicketId}</p>
          </div>
          <div className='flex row change-date'>
            <p className='heading-base'>T??n s??? ki???n</p>
            <p className='heading-base'>{props.docEventName}</p>
          </div>
          <div className='flex row change-date'>
            <p className='heading-base'>H???n s??? d???ng</p>
            <DatePicker
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              style={{ position: 'relative' }}
              value={
                dateUpdate
                  ? moment(new Date(dateUpdate), 'DD MMM, YYYY')
                  : moment(new Date(dateUpdate), 'DD MMM, YYYY')
              }
              defaultValue={moment(new Date(dateUpdate), 'DD MMM, YYYY')}
              defaultPickerValue={moment(new Date(dateUpdate), 'DD MMM, YYYY')}
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
    </Menu>
  )
}

export default MenuAntd
