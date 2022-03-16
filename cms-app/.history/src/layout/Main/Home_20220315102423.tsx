import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'

export interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='Dashboard' element={<Dashboard />}></Route>
        <Route path='TicketManagement' element={<TicketManage />}></Route>
        <Route path='TicketCheck' element={<TicketCheck />}></Route>
      </Routes>
    </div>
  )
}

export default Main
