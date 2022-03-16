import React, { PropsWithChildren, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from './Dashboard'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'

export interface IMainProps {}

const Main: React.FunctionComponent<PropsWithChildren<IMainProps>> = (
  props
) => {
  // const [header, setHeader] = useState<string>('header')
  return (
    <div className='wrapper'>
      <div className='container'>
        <Header />
      </div>
      <Sidebar />
      <div className='main'>
        <Routes>
          <Route path='Dashboard' element={<Dashboard />}></Route>
          <Route path='TicketManagement' element={<TicketManage />}></Route>
          <Route path='TicketCheck' element={<TicketCheck />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Main
