import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", height: "100%", background: "#f5f6fa" }}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: 20 }}>Search App</h2>

        <div style={styles.menuItem}>Dashboard</div>
        <div style={styles.menuItem}>Stores</div>
        <div style={styles.menuItem}>Analytics</div>
        <div style={styles.menuItem}>Logs</div>
        <div style={styles.menuItem}>Settings</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1 }}>
        
        {/* Topbar */}
        <div style={styles.topbar}>
          <input placeholder="Search..." style={styles.search} />
          <div>👤 Najam</div>
        </div>

        {/* Page Content */}
        <div style={{ padding: 20 }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 220,
    background: "#fff",
    padding: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.05)"
  },
  menuItem: {
    padding: "10px 0",
    cursor: "pointer",
    color: "#555"
  },
  topbar: {
    height: 60,
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #eee"
  },
  search: {
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ddd"
  }
};