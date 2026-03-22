import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Sep", amount: 980 },
  { month: "Oct", amount: 1120 },
  { month: "Nov", amount: 860 },
  { month: "Dec", amount: 1450 },
  { month: "Jan", amount: 1100 },
  { month: "Feb", amount: 1240 },
];

function SpendingChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#111827",
            border: "none",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#fff" }}
        />
        <Bar dataKey="amount" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SpendingChart;
