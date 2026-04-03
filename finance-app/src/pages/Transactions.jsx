import { useState, useEffect } from "react";
import CSVUpload from "../components/CSVUpload";
import { fetchTransactions } from "../api/transactions";

const defaultTransactions = [
  {
    id: 1,
    name: "Spotify",
    category: "Subscriptions",
    amount: -9.99,
    date: "Mar 20",
  },
  { id: 2, name: "Salary", category: "Income", amount: 3500, date: "Mar 15" },
  {
    id: 3,
    name: "Whole Foods",
    category: "Groceries",
    amount: -84.32,
    date: "Mar 14",
  },
  {
    id: 4,
    name: "Netflix",
    category: "Subscriptions",
    amount: -15.99,
    date: "Mar 13",
  },
  {
    id: 5,
    name: "Electric bill",
    category: "Utilities",
    amount: -112.0,
    date: "Mar 12",
  },
  {
    id: 6,
    name: "Chipotle",
    category: "Dining",
    amount: -13.45,
    date: "Mar 11",
  },
];

function Transactions() {
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        if (data && data.length > 0) setTransactions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUpload = (newTransactions) => {
    setTransactions(newTransactions);
    setUploaded(true);
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Transactions</h1>

      {/* CSV Upload - hides after upload */}
      {!uploaded && (
        <div className="mb-6">
          <CSVUpload onUpload={handleUpload} />
        </div>
      )}

      {/* Uploaded badge */}
      {uploaded && (
        <div className="mb-4 flex items-center gap-4">
          <div clasName="px-4 py-2 bg-green-900 text-green-400 text-sm rounded-xl">
            CSV imported - {transactions.length} transactions loaded
          </div>
          <button
            onClick={() => {
              setTransactions(defaultTransactions);
              setUploaded(false);
            }}
            className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      {/* Transaction list */}
      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        {transactions.map((t, i) => (
          <div
            key={t.id}
            className={`flex items-center justify-between px-6 py-4 ${
              i !== transactions.length - 1 ? "border-b border-gray-800" : ""
            }`}
          >
            <div>
              <p className="text-white font-medium">{t.name}</p>
              <p className="text-gray-400 text-sm">
                {t.category} · {t.date}
              </p>
            </div>
            <span
              className={`font-semibold ${t.amount > 0 ? "text-green-400" : "text-red-400"}`}
            >
              {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
