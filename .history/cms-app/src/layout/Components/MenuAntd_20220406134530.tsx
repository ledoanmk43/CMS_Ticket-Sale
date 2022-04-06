import { Menu } from 'antd'
import React from 'react'
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
      // const ticketQuery = query(
      //   collection(db, 'tickets'),
      //   where('id', '==', props.docId)
      // )
      // const datas = await getDocs(ticketQuery)
      // console.log(datas)
      // datas.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data())
      //   updateDoc(doc.data().status, {
      //     status: 'used',
      //   })
      // })
      const docRef = doc(db, 'tickets', `${props.docId}`)
      console.log(docRef)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Menu selectable className='menu'>
      <Menu.Item onClick={changeStatus} key='1'>
        Sử dụng vé
      </Menu.Item>
      <Menu.Item key='2'>Đổi ngày sử dụng</Menu.Item>
    </Menu>
  )
}

export default MenuAntd
