import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Dashboard from './Dashboard'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'

export interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  return (
    <div className='wrapper'>
      <Headerer className='header'></Header>
      <Routes>
        <Route path='Dashboard' element={<Dashboard />}></Route>
        <Route path='TicketManagement' element={<TicketManage />}></Route>
        <Route path='TicketCheck' element={<TicketCheck />}></Route>
      </Routes>
    </div>
  )
}

export default Main
