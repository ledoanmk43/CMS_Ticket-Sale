import { Menu, Modal } from 'antd'
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

  const [modalChangeDate, setModalChangeDate] = useState<any>(false)

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
  }
  return (
    <Menu className='menu'>
      <Menu.Item onClick={changeStatus} key='1'>
        Sử dụng vé
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setModalChangeDate(true)
          props.setIsDropDownOpen(false)
        }}
        key='2'
      >
        Đổi ngày sử dụng
      </Menu.Item>
      {modalChangeDate && (
        <Modal
          visible={modalChangeDate}
          centered
          title='Đổi ngày sử dụng vé'
          closable={false}
          okText='Lưu'
          onCancel={() => setModalChangeDate(false)}
          cancelText='Huỷ'
          wrapClassName='modal-small'
          maskClosable={true}
        >
          <div className='flex row'>
            <p className='heading-base'>Số vé</p>
            <p className='heading-base'>{props.docTicketId}</p>
          </div>
          <div className='flex'>
            <p className='heading-base'>Tên sự kiện</p>
          </div>
          <div className='flex'>
            <p className='heading-base'>Hạn sử dụng</p>
          </div>
        </Modal>
      )}
    </Menu>
  )
}

export default MenuAntd
