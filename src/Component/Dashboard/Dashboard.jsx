import React from 'react'
import SideBar from './SideBar'
import Stores from './Stores'
import "../Dashboard/Dashboard.css"

const Dashboard = () => {
  return (
    <>
    <div className="dashboard">
    <SideBar />
    <Stores />
    </div>
    </>
  )
}

export default Dashboard