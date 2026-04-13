export default function Card({ title, value, growth }) {
    const isPositive = growth >= 0;

    return (
        <div style={styles.card}>
            <p style={{ color: "#777" }}>{title}</p>

            <h2>{value}</h2>

            <span
                style={{
                    color: isPositive ? "green" : "red",
                    fontSize: "13px",
                }}
            >
                {isPositive ? "↑" : "↓"} {Math.abs(growth)}% last 7 days
            </span>
        </div>
    );
}

const styles = {
    card: {
        flex: 1,
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
    }
}