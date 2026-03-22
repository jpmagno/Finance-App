function StreakBadge({ streak }) {
  return (
    <div className="flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
      <span>🔥</span>
      <span>{streak} day streak</span>
    </div>
  );
}

export default StreakBadge;
