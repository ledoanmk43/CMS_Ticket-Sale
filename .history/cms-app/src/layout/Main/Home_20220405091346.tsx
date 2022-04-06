import React, { PropsWithChildren, useRef, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from './Dashboard'
import ServicePack from './ServicePack'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../../App'
export interface IHomeProps {}
export interface Ticket {
  id: number
  bookingId: string
  ticketId: number
  eventName: string
  status: string
  dateUse: Date
  dateRelease: Date
  gate?: string
  price: number
}

const Home: React.FunctionComponent<PropsWithChildren<IHomeProps>> = (
  props
) => {
  const [ticketsData, setTicketsData] = useState()

  useEffect(() => {
    const ticketsCollectionRef = collection(db, 'tickets')
    const getAllTickets = async () => {
      try {
        await getDocs(ticketsCollectionRef).then((snapshot) => {
          const tickets: any = []
          let dateUse: any = ''
          snapshot.forEach((doc) => {
            tickets.push(doc.data({}))
          })
          setTicketsData(tickets.sort((a: any, b: any) => a.id - b.id))
          setTimeout(() => {
            const data: any = JSON.stringify(ticketsData)
            console.log(data)
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
    getAllTickets()
  }, [])

  return (
    <div className='wrapper'>
      <Sidebar />
      <div className='wrapper-container'>
        <Header />
        {/* <div className='main'> */}
        <Routes>
          <Route path='' element={<Navigate to='/home-dashboard' />} />
          <Route path='home-dashboard' element={<Dashboard />}></Route>
          <Route path='tickets-management' element={<TicketManage />}></Route>
          <Route path='tickets-checking' element={<TicketCheck />}></Route>
          <Route path='service-packages' element={<ServicePack />}></Route>
        </Routes>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Home
