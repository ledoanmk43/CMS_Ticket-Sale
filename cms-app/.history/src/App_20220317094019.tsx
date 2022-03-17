import React from 'react'
import Home from './layout/Main/Home'

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
