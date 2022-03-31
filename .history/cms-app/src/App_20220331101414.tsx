import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './layout/Main/Home'
import { initializeApp } from 'firebase/app'
import { CONFIG } from './config/config'
import { getFirestore } from '@firebase/firestore'

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = ({ children }) => {
  return (
    <Router>
      <Route path='/*' element={<Home />}></Route>
    </Router>
  )
}
const app = initializeApp(CONFIG.firebaseConfig)
export const db = getFirestore(app)

export default App
