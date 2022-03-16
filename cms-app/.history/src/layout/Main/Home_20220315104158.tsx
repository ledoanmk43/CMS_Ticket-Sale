import React, { PropsWithChildren, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Dashboard from './Dashboard'
import TicketCheck from './TicketCheck'
import TicketManage from './TicketManage'

export interface IMainProps {}

const Main: React.FunctionComponent<{
  className: string;
  setClassName: (className: string) => void;
}<IMainProps>> = ( 
  props
) => {
  const [header, setHeader] = useState<string>('header')
  return (
    <div className='wrapper'>
      <Header setClassName={setHeader} className={header} />
      <Routes>
        <Route path='Dashboard' element={<Dashboard />}></Route>
        <Route path='TicketManagement' element={<TicketManage />}></Route>
        <Route path='TicketCheck' element={<TicketCheck />}></Route>
      </Routes>
    </div>
  )
}

export default Main
