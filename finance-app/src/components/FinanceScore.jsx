function FinanceScore({ score }) {
  const getColor = (s) => {
    if (s >= 80)
      return { text: "text-green-400", ring: "#4ade80", label: "Excellent" };
    if (s >= 60)
      return { text: "text-violet-400", ring: "#a78bfa", label: "Good" };
    if (s >= 40)
      return { text: "text-yellow-400", ring: "#facc15", label: "Fair" };
    return { text: "text-red-400", ring: "#f87171", label: "Needs work" };
  };

  const { text, ring, label } = getColor(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gray-900 rounded-2x1 p-6 flex items-center gap-6">
      {/* Circle */}
      <div className="relative w-32 h-32 shrink-0">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#1f2937"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3x1 font-bold ${text}`}>{score}</span>
          <span className="text-gray-400 text-xs">/ 100</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1">
        <p className="text-white text-lg font-semibold mb-1">Finance score</p>
        <p className={`text-sm font-medium mb-4 ${text}`}>{label}</p>
        <div className="flex flex-col gap-2">
          <ScoreRow label="Savings rate" value={72} color="bg-green-500" />
          <ScoreRow label="Budget adherence" value={65} color="bg-violet-500" />
          <ScoreRow
            label="Spending consistency"
            value={81}
            color="bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-xs w-40 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-gray-400 text-xs w-6 text-right">{value}</span>
    </div>
  );
}

export default FinanceScore;
