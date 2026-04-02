import React from 'react'

const SideBar = () => {
  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#111",
        color: "#fff",
        height: "100vh",
        padding: "20px"
      }}>
        <h3>Admin</h3>

        <p>Stores</p>
        <p>Analytics</p>
        <p>Settings</p>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>Welcome to your system 🚀</p>
      </div>

    </div>
  )
}

export default SideBar