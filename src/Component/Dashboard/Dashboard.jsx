import StatCard from "./StatCard";
import Card from "./Card";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [stats, setStats] = useState({});
    const [topSearches, setTopSearches] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [recent, setRecent] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [days, setDays] = useState(7);

    useEffect(() => {
        fetch("https://tbp-search-app-backend-production.up.railway.app/api/analytics/stats")
            .then(res => res.json())
            .then(setStats);

        fetch("https://tbp-search-app-backend-production.up.railway.app/api/analytics/top-searches")
            .then(res => res.json())
            .then(setTopSearches);

        fetch("https://tbp-search-app-backend-production.up.railway.app/api/analytics/top-products")
            .then(res => res.json())
            .then(setTopProducts);
        fetch("https://tbp-search-app-backend-production.up.railway.app/api/analytics/recent-searches")
            .then(res => res.json())
            .then(setRecent);
    }, []);
    useEffect(() => {
        fetch(`https://tbp-search-app-backend-production.up.railway.app/api/analytics/search-trends?days=${days}`)
            .then(res => res.json())
            .then(setTrendData);
    }, [days]);

    const chartData = {
        labels: trendData.map(item => item._id), // X-axis (dates)

        datasets: [
            {
                label: "Searches",
                data: trendData.map(item => item.count), // Y-axis

                borderColor: "#6366f1",
                backgroundColor: "rgba(99,102,241,0.2)",

                tension: 0.4, // smooth curve 🔥
                fill: true,

                pointRadius: 4,
                pointBackgroundColor: "#6366f1",
            },
        ],
    };

    const chartOptions = {
        responsive: true,

        plugins: {
            legend: { display: false },
        },

        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: "#888",
                },
            },

            y: {
                grid: {
                    color: "#eee",
                },
                ticks: {
                    color: "#888",
                },
            },
        },
    };

    return (
        <div style={styles.container}>

            <h2 style={styles.heading}>Dashboard</h2>

            {/* 🔥 STATS */}
            <div style={styles.stats}>
                <Card title="Total Searches" value={stats.totalSearches || 0} growth={stats.searchesGrowth || 0} />
                <Card title="Clicks" value={stats.totalClicks || 0} growth="+15%" />
                <Card title="No Results" value={stats.noResults || 0} growth="+10%" />
            </div>

            {/* 🔥 MAIN GRID */}
            <div style={styles.grid}>

                {/* LEFT BIG CHART */}
                <div style={styles.largeCard}>
                    <div style={styles.cardHeader}>
                        <h3>Search Trends</h3>

                        <div style={styles.filter}>
                            {[7, 15, 30].map(d => (
                                <button key={d} onClick={() => setDays(d)}>
                                    {d} days
                                </button>
                            ))}
                        </div>
                    </div>

                    <Line data={chartData} options={chartOptions} />
                </div>

                {/* RIGHT SMALL */}
                <div style={styles.smallCard}>
                    <h3>Top Searches</h3>

                    {topSearches.map((item, i) => (
                        <div key={i} style={styles.listItem}>
                            <span>{item._id}</span>
                            <span>{item.count}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* 🔥 BOTTOM GRID */}
            <div style={styles.grid}>

                <div style={styles.smallCard}>
                    <h3>Top Products</h3>

                    {topProducts.map((item, i) => (
                        <div key={i} style={styles.productItem}>
                            <div style={styles.avatar}></div>
                            <span>{item._id}</span>
                            <span>{item.count} clicks</span>
                        </div>
                    ))}
                </div>

                <div style={styles.smallCard}>
                    <h3>Recent Searches</h3>

                    {recent.map((item, i) => (
                        <div key={i} style={styles.productItem}>
                            <div style={styles.avatar}></div>
                            <span>{item._id}</span>
                            <span>{item.count} clicks</span>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
    },

    heading: {
        fontSize: "22px",
        marginBottom: "20px",
        fontWeight: "600",
    },

    stats: {
        display: "flex",
        gap: "20px",
        marginBottom: "25px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px",
        marginBottom: "20px",
    },

    largeCard: {
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
    },

    smallCard: {
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
    },

    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
    },

    badge: {
        fontSize: "12px",
        background: "#eef2ff",
        padding: "5px 10px",
        borderRadius: "8px",
        color: "#6366f1",
    },

    filter: {
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
    },

    btn: {
        padding: "6px 12px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },

    listItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #eee",
    },

    productItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
    },

    avatar: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "#ddd",
        marginRight: 10,
    },
};