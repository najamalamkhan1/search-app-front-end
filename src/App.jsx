import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import Dashboard from './Component/Dashboard/Dashboard'
import Stores from './Component/Dashboard/Stores'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} >
          <Route path='/dashboard/stores' element={<Stores />} />
          </Route>
          {/* <SearchBar /> */}
          {/* <ProductList /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
