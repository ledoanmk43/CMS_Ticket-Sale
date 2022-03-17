import React, { PropsWithChildren, useRef, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from './Dashboard'
import ServicePack from './ServicePack'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'

export interface IHomeProps {}

const Home: React.FunctionComponent<PropsWithChildren<IHomeProps>> = (
  props
) => {
  return (
    <div className='wrapper'>
      <Sidebar />
      <div className='container'>
        <Header />
        <div className='main'>
          <Routes>
            <Route path='*/Dashboard' element={<Dashboard />}></Route>
            <Route path='TicketManagement' element={<TicketManage />}></Route>
            <Route path='TicketCheck' element={<TicketCheck />}></Route>
            <Route path='ServicePack' element={<ServicePack />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Home
