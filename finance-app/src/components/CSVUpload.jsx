import { useState } from "react";

function CSVUpload({ onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");

  const parseCSV = (text) => {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

    const rows = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const row = {};
      headers.forEach((h, i) => {
        row[h] = values[i];
      });
      return row;
    });

    return rows;
  };

  const categorize = (description = "") => {
    const d = description.toLowerCase();
    if (d.includes("spotify") || d.includes("netflix") || d.includes("hulu"))
      return "Subscriptions";
    if (d.includes("uber") || d.includes("lyft") || d.includes("gas"))
      return "Transport";
    if (d.includes("amazon") || d.includes("walmart") || d.includes("target"))
      return "Shopping";
    if (
      d.includes("restaurant") ||
      d.includes("chipotle") ||
      d.includes("mcdonald")
    )
      return "Dining";
    if (
      d.includes("grocery") ||
      d.includes("whole foods") ||
      d.includes("kroger")
    )
      return "Groceries";
    if (d.includes("electric") || d.includes("water") || d.includes("internet"))
      return "Utilities";
    if (d.includes("salary") || d.includes("payroll") || d.includes("deposit"))
      return "Income";
    return "Other";
  };

  const handleFile = (file) => {
    setError("");
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a .csv file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rows = parseCSV(e.target.result);
        const transactions = rows.map((row, i) => ({
          id: i + 1,
          name:
            row["description"] || row["name"] || row["merchant"] || "Unknown",
          amount: parseFloat(row["amount"] || row["debit"] || 0),
          date: row["date"] || "Unknown",
          category: categorize(row["description"] || row["name"] || ""),
        }));
        setPreview(transactions.slice(0, 5));
        onUpload(transactions);
      } catch {
        setError(
          "Could not parse this CSV. Make sure to use headers such as: date, description, amount",
        );
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="bg-gray-900 rounded-3x1 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Import transactions
      </h2>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${
          dragging
            ? "border-violet-500 bg-violet-950"
            : "border-gray-700 hover:border-violet-600"
        }`}
        onClick={() => document.getElementById("csv-input").click()}
      >
        <p className="text-gray-400 text-sm mb-1">
          Drag and drop your bank CSV here
        </p>
        <p className="text-gray-600 text-xs">or click to browse</p>
        <input
          id="csv-input"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

      {/* Preview */}
      {preview.length > 0 && (
        <div className="mt-4">
          <p className="text-gray-400 text-xs mb-2">Preview - first 5 rows</p>
          <div className="roudned-xl overflow-hidden">
            {preview.map((t, i) => (
              <div
                key={i}
                className={`flex justify-between px-4 py-3 text-sm ${
                  i !== preview.length - 1 ? "border-b border-gray-800" : ""
                }`}
              >
                <div>
                  <p className="text-white">{t.name}</p>
                  <p className="text-gray-500 text-xs">
                    {t.category} * {t.date}
                  </p>
                </div>
                <span
                  className={t.amount < 0 ? "text-red-400" : "text-green-400"}
                >
                  {t.amount < 0 ? "" : "+"}${Math.abs(t.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CSVUpload;
