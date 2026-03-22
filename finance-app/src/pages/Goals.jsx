function GoalCard({ label, saved, target, color }) {
  const percent = Math.round((saved / target) * 100);

  return (
    <div className="bg-gray-900 rounded-2xl p-5">
      <div className="flex justify-between items-center mb-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-gray-400 text-sm">
          ${saved} / ${target}
        </p>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-gray-400 text-xs mt-2">{percent}% complete</p>
    </div>
  );
}

function Goals() {
  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Goals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GoalCard
          label="Emergency fund"
          saved={2400}
          target={5000}
          color="bg-violet-500"
        />
        <GoalCard
          label="Vacation to Japan"
          saved={800}
          target={3000}
          color="bg-blue-500"
        />
        <GoalCard
          label="New laptop"
          saved={650}
          target={1200}
          color="bg-green-500"
        />
        <GoalCard
          label="Pay off credit card"
          saved={1100}
          target={1500}
          color="bg-orange-500"
        />
      </div>
    </div>
  );
}

export default Goals;
