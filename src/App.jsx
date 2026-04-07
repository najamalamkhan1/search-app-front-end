import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import Dashboard from './Component/Dashboard/Dashboard'
import Stores from './Component/Dashboard/Stores'
import ErrorPage404 from './Component/ErrorPage404/ErrorPage404'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} >
          <Route path='/dashboard/stores' element={<Stores />} />
          </Route>
          <Route path='*' element={<ErrorPage404 />} />
          {/* <SearchBar /> */}
          {/* <ProductList /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
