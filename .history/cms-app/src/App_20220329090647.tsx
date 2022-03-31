import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './layout/Main/Home'

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = ({ children }) => {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Home />}></Route>
      </Routes>
    </Router>
  )
}

export default App
