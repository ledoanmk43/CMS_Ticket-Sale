import React, { PropsWithChildren, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

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
            <Route path='Dashboard' element={<Dashboard />}></Route>
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
