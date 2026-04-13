import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import Stores from './Component/Dashboard/Stores'
import ErrorPage404 from './Component/ErrorPage404/ErrorPage404'
import Analytics from "../src/Component/Dashboard/Analytics"
import Login from './Component/Authentication Component/Login'
import Signup from './Component/Authentication Component/Signup'
import DashboardLayout from './Component/Dashboard/DashboardLayout'
import Dashboard from '../src/Component/Dashboard/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<DashboardLayout />} >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* <Route path='*' element={<ErrorPage404 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
