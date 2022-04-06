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
      const ticketQuery = query(
        collection(db, 'tickets'),
        where('id', '==', props.docId)
      )
      const querySnapshot = await getDocs(ticketQuery)
      console.log('Snapshot', querySnapshot)
      if (!querySnapshot.empty) {
  // simply update the record

  querySnapshot.forEach((doc) => {
    doc.id.set({
      shares: doc.id.data().shares+=1
    })
    // doc.data() is never undefined for query doc snapshots
    console.log(doc, doc.id, ' => ', doc.data());
  });
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          shares: (doc.data().shares += 1),
        })
        console.log(doc.id, ' => ', doc.data())
        // updateDoc(, {
        //   status: 'used',  
        // })
      })
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
