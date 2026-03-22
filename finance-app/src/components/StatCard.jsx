function StatCard({ label, value, trend }) {
  return (
    <div className="bg-gray-900 rounded-2x1 p-5">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-2x1 font-bold text-white">{value}</p>
      <p
        className={`text-xs mt-1 ${trend === "up" ? "text-green-400" : "text-red-400"}`}
      ></p>
    </div>
  );
}

export default StatCard;
