import { useState } from "react";

function Upgrade() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://3.238.171.183:8000/create-checkout-session",
        {
          method: "POST",
        },
      );
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <h1 className="text-2x1 font-bold text-white mb-2">Upgrade to Pro</h1>
      <p className="text-gray-400 mb-8">Unlock the full power of FinanceApp</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
        {/* Free tier */}
        <div className="bg-gray-900 rounded-2x1 p-6 border border-gray-800">
          <h2 className="text-white font-bold text-lg mb-1">Free</h2>
          <p className="text-3x1 font-bold text-white mb-6">
            $0<span className="text-gray-400 text-sm font-normal">/month</span>
          </p>
          <ul className="space-y-3 text-sm text-gray-400 mb-6">
            <li>CSV upload (1 account)</li>
            <li>Basic spending categories</li>
            <li>Monthly budget goals</li>
            <li>Spending heatmap</li>
            <li>Finance score</li>
          </ul>
          <div className="w-full py-2 px-4 rounded-xl border border-gray-700 text-gray-400 text-sm text-center">
            Current plan
          </div>
        </div>

        {/* Pro tier */}
        <div className="bg-gray-900 rounded-2x1 p-6 border-2 border-violet-500">
          <div className="inline-block bg-violet-600 text-white text-xs px-3 py-1 rounded-full mb-3">
            Most popular
          </div>
          <h2 className="text-white font-bold text-lg mb-1">Pro</h2>
          <p className="text-3xl font-bold text-white mb-6">
            $6.99
            <span className="text=gray-400 text-sm font-normal">/month</span>
          </p>
          <ul className="space-y-3 text-sm text-gray-300 mb-6">
            <li>Everything in Free</li>
            <li>Multi-account aggregation</li>
            <li>Spending forecast</li>
            <li>Anomaly detection alerts</li>
            <li>Year in review (Wrapped)</li>
            <li>PDF / Excel exports</li>
            <li>Unlimited history</li>
          </ul>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-2 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Upgrade to Pro"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
