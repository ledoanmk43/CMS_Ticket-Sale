import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TicketManage from './TicketManage'

export interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  return (
    <Routes>
      <Route path='TicketManagement' element={<TicketManage />}></Route>
    </Routes>
  )
}

export default Main
