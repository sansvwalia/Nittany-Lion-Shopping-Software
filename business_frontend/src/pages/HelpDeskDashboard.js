import { BrowserRouter as Link } from "react-router-dom";
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

