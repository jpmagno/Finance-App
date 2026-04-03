const BASE_URL = "http://localhost:8000";

export const fetchTransactions = async () => {
  const response = await fetch(`${BASE_URL}/transactions`);
  const data = await response.json();
  return data;
};

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${BASE_URL}/transactions/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.transactions;
};
