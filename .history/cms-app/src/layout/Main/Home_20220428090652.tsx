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
import moment from 'moment'
export interface IHomeProps {}
export interface Packages {
  id: number
  packageId: string
  packageName: string
  dateBegin: Date
  dateEnd: Date
  packageStatus: boolean
  comboPrice: number
  ticketPrice: number
}
export interface Ticket {
  id: number
  bookingId: string
  ticketId: string
  eventName: string
  status: string
  dateUse: Date
  dateRelease: Date
  checkingStatus: boolean
  gate: string
  price: number
}
const Home: React.FunctionComponent<PropsWithChildren<IHomeProps>> = (
  props
) => {
  const [ticketsData, setTicketsData] = useState()
  const [packagesData, setPackagesData] = useState()
  useEffect(() => {
    const getAllTickets = async () => {
      await onSnapshot(collection(db, 'tickets'), (snapshot) => {
        const tickets: any = []
        snapshot.forEach((doc) => {
          tickets.push(doc.data())
        })
        setTicketsData(
          tickets
            .map((item: any) => ({
              ...item,

              dateUse: item.dateUse.toDate().toLocaleDateString('en-GB'),
              dateRelease: item.dateRelease
                .toDate()
                .toLocaleDateString('en-GB'),
            }))
            .sort((a: any, b: any) => a.id - b.id)
        )
      })
    }
    const getAllPacks = async () => {
      await onSnapshot(collection(db, 'ticketpacks'), (snapshot) => {
        const packs: any = []
        snapshot.forEach((doc) => {
          packs.push(doc.data())
        })
        setPackagesData(
          packs
            .map((item: any) => ({
              ...item,
              dateBegin: item.dateBegin.toDate().toLocaleString('en-GB'),
              dateEnd: item.dateEnd.toDate().toLocaleString('en-GB'),
              packageStatus: item.packageStatus ? '??ang ??p d???ng' : 'T???t',
            }))
            .sort((a: any, b: any) => a.id - b.id)
        )
      })
    }
    getAllTickets()
    getAllPacks()
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
            element={<ServicePack packagesData={packagesData} />}
          ></Route>
        </Routes>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Home
