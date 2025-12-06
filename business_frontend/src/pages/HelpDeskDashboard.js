import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function HelpDeskDashboard() {
  return (
            <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p>Help Desk Dashboard</p>
            </header>

            <main>
            <div className="min-h-screen bg-slate-100">
                <header className="bg-slate-800 text-white text-center py-6 text-3xl font-semibold">
                IT Staff Dashboard
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
                <DashboardCard title="Support Ticket History" to="/ticketslist" />
                <DashboardCard title="User List" to="/userslist" />
                <DashboardCard title="Vendor List" to="/sellerslist" />
                <DashboardCard title="Product List" to="/productslist" />
                </div>

            </div>

            </main>
            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>

            </div>
  );
}

function DashboardCard({ title, to }) {
  return (
    <Link
      to={to}
      className="bg-white p-8 rounded-2xl shadow-lg text-center text-xl font-bold hover:scale-105 transition-transform cursor-pointer"
    >
      {title}
    </Link>
  );
}

