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
      const docRef = doc(db, 'tickets', `${props.docId}`)
      console.log(docRef)
      const docSnap = await getDoc(docRef)
      console.log(docSnap)

      // const querySnapshot = await getDocs(ticketQuery)
      // console.log(querySnapshot)
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data())
      //   const docRef = doc.data().status
      //   console.log(docRef);
      //   updateDoc(docRef, {
      //     status: 'used',
      //   })
      // })
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
