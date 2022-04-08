import React, { PropsWithChildren, useRef, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from './Dashboard'
import ServicePack from './ServicePack'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../App'
export interface IHomeProps {}
export interface Ticket {
  id: number
  bookingId: string
  ticketId: string
  eventName: string
  status: string
  dateUse: Date
  dateRelease: Date
  checkingStatus: boolean
  gate?: string
  price: number
}

const Home: React.FunctionComponent<PropsWithChildren<IHomeProps>> = (
  props
) => {
  const [ticketsData, setTicketsData] = useState()

  useEffect(() => {
    const getAllTickets = async () => {
      await onSnapshot(collection(db, 'tickets'), (snapshot) => {
        const tickets: any = []
        snapshot.forEach((doc) => {
          tickets.push(doc.data())
        })
        setTicketsData(tickets.sort((a: any, b: any) => a.id - b.id))
      })
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
          <Route
            path='home-dashboard'
            element={<Dashboard ticketsData={ticketsData} />}
          ></Route>
          <Route
            path='tickets-management'
            element={<TicketManage ticketsData={ticketsData} />}
          ></Route>
          <Route
            path='tickets-checking'
            element={<TicketCheck ticketsData={ticketsData} />}
          ></Route>
          <Route
            path='service-packages'
            element={<ServicePack ticketsData={ticketsData} />}
          ></Route>
        </Routes>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Home
