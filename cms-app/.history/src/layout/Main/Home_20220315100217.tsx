import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'

export interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  return (
    <Routes>
      <Route path='/Dashboard' component={<Dashboard />}></Route>
      <Route path='/TicketManagement' element={<TicketManage />}></Route>
      <Route path='/TicketCheck' element={<TicketCheck />}></Route>
    </Routes>
  )
}

export default Main
