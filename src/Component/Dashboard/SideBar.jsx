import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="sidebar">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/dashboard/stores">
    <p>Stores</p>
    </Link>
    <Link to="/dashboard/analytics">
    <p>Analytics</p>
    </Link>
  </div>
  )
}

export default SideBar