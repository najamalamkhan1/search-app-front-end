import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TrendingUp, MousePointerClick, SearchX } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const styles = {
  container: {
    padding: "30px",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "25px",
    fontWeight: "600",
  },
};

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [searches, setSearches] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://tbp-search-app-backend-production.up.railway.app/api/analytics/stats").then(res => res.json()).then(setStats);
    fetch("https://tbp-search-app-backend-production.up.railway.app/api/analytics/top-searches").then(res => res.json()).then(setSearches);
    fetch("https://tbp-search-app-backend-production.up.railway.app/api/analytics/top-products").then(res => res.json()).then(setProducts);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Analytics</h2>

      <div style={styles.cards}>
        <StatCard
          title="Searches"
          value={stats.totalSearches || 0}
          icon={<TrendingUp size={22} />}
          color="#6366f1"
        />

        <StatCard
          title="Clicks"
          value={stats.totalClicks || 0}
          icon={<MousePointerClick size={22} />}
          color="#10b981"
        />

        <StatCard
          title="No Results"
          value={stats.noResults || 0}
          icon={<SearchX size={22} />}
          color="#ef4444"
        />
      </div>

      <div style={styles.grid}>
        <ChartCard title="Top Searches">
          <Bar
            data={{
              labels: searches.map(s => s._id),
              datasets: [
                {
                  label: "Searches",
                  data: searches.map(s => s.count),
                },
              ],
            }}
          />
        </ChartCard>

        <ChartCard title="Top Products">
          <Bar
            data={{
              labels: products.map(p => p._id),
              datasets: [
                {
                  label: "Clicks",
                  data: products.map(p => p.count),
                },
              ],
            }}
          />
        </ChartCard>
      </div>
    </div>
  );
}