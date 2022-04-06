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
      // Create an initial document to update.
      const frankDocRef = doc(db, 'tickets', '1')
      await setDoc(frankDocRef, {
        name: 'Frank',
        favorites: { food: 'Pizza', color: 'Blue', subject: 'recess' },
        age: 12,
      })
      console.log('frank', frankDocRef)
      // To update age and favorite color:
      await updateDoc(frankDocRef, {
        age: 13,
      })
      //-----------------------
      const ticketQuery = query(
        collection(db, 'tickets'),
        where('id', '==', props.docId)
      )
      const querySnapshot = await getDocs(ticketQuery)
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        // updateDoc(doc.data(), {
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
