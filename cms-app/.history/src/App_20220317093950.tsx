import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './layout/Main/Home'

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />}></Route>
        <Route path='' element={<Navigate to='/Dahboard' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
