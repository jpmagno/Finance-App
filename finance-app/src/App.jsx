import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";

function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/transactions", label: "Transactions" },
    { to: "/goals", label: "Goals" },
  ];

  return (
    <div className="w-56 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-6">
      <h1 className="text-xl font-bold text-white mb-10">💰 FinanceApp</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-950 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
