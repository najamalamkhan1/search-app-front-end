const styles = {
    grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  chartCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
}

function ChartCard({ title, children }) {
  return (
    <div style={styles.chartCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default ChartCard