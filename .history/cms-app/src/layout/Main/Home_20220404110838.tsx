import React, { PropsWithChildren, useRef, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
      <div className='wrapper-container'>
        <Header />
        {/* <div className='main'> */}
        <Routes>
          <Route path='' element={<Navigate to='/home-dashboard' />} />
          <Route path='home-dashboard' element={<Dashboard />}></Route>
          <Route path='ticket-management' element={<TicketManage />}></Route>
          <Route path='ticket-checking' element={<TicketCheck />}></Route>
          <Route path='service-packages' element={<ServicePack />}></Route>
        </Routes>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Home
