import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './layout/Main/Main'

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/' element={<Main />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
