const generateData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      amount: Math.random() > 0.3 ? Math.floor(Math.random() * 200) : 0,
    });
  }
  return data;
};

const getColor = (amount) => {
  if (amount === 0) return "bg-gray-800";
  if (amount < 30) return "bg-violet-900";
  if (amount < 70) return "bg-violet-700";
  if (amount < 120) return "bg-violet-500";
  return "bg-violet-400";
};

function SpendingHeatmap() {
  const data = generateData();
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="bg-gray-900 rounded-2x1 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Spending activity
      </h2>

      {/* Legend */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-400 text-xs">Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-800" />
        <div className="w-3 h-3 rounded-sm bg-violet-900" />
        <div className="w-3 h-3 rounded-sm bg-violet-700" />
        <div className="w-3 h-3 rounded-sm bg-violet-500" />
        <div className="w-3 h-3 rounded-sm bg-violet-400" />
        <span className="text-gray-400 text-xs">More</span>
      </div>

      {/* Grid */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: $${day.amount}`}
                className={`w-3 h-3 rounded-sm ${getColor(day.amount)} cursor-pointer hover: opacity-70 transition-opacity`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex gap-1 mt-2 overflow-x-auto">
        {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
          <span
            key={m}
            className="text-gray-500 text-xs"
            style={{ minWidth: "52px" }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SpendingHeatmap;
