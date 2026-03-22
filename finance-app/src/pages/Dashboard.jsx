import StatCard from "../components/StatCard";
import SpendingChart from "../components/SpendingChart";
import StreakBadge from "../components/StreakBadge";
import SpendingHeatmap from "../components/SpendingHeatmap";
import FinanceScore from "../components/FinanceScore";
import CategoryChart from "../components/CategoryChart";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2x1 font-bold text-white">Finance App</h1>
        <StreakBadge streak={7} />
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Monthly spending" value="$1,240" trend="up" />
        <StatCard label="Monthly income" value="$3,500" trend="up" />
        <StatCard label="Saved this month" value="$680" trend="up" />
      </div>

      {/* Finance score */}
      <div className="mb-8">
        <FinanceScore score={73} />
      </div>

      {/* Spending heatmap */}
      <div className="mb-8">
        <SpendingHeatmap />
      </div>

      {/* Chart */}
      <div className="bg-gray-900 rounded-2x1 p-6">
        <h2 className="text-lg font-semibold mb-4">Spending by month</h2>
        <SpendingChart />
      </div>
      <CategoryChart />
    </div>
  );
}

export default Dashboard;
