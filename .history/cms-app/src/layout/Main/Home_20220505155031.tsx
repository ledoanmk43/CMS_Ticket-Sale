import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from './Dashboard'
import ServicePack from './ServicePack'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../App'

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
  const [ticketsDataChart, setTicketsDataChart] = useState()
  const [packagesData, setPackagesData] = useState()

  useEffect(() => {
    const getAllTickets = async () => {
      await onSnapshot(collection(db, 'tickets'), (snapshot) => {
        const tickets: any = []
        snapshot.forEach((doc) => {
          tickets.push(doc.data())
        })
        setTicketsData(tickets.sort((a: any, b: any) => a.id - b.id))
        setTicketsDataChart(
          tickets
            .map((item: any) => ({
              ...item,
            }))
            .sort((a: any, b: any) => a.dateUse - b.dateUse)
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
              packageStatus: item.packageStatus ? 'Đang áp dụng' : 'Tắt',
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
        <Routes>
          <Route path='' element={<Navigate to='/home-dashboard' />} />
          <Route
            path='home-dashboard'
            element={
              <Dashboard
                // ticketsData={ticketsData}
                ticketsDataChart={ticketsDataChart}
              />
            }
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
      </div>
    </div>
  )
}

export default Home
