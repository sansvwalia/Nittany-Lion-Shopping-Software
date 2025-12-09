
import { Link } from "react-router-dom";


export default function SellerAnalytics() {
    return (
            <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p>Product Analytics</p>
                <h2><Link 
                            to="/helpdesk"
                            className="text-blue-600 hover:underline font-medium">
                            Return to Help Desk Dashboard
                            </Link></h2>
            </header>

            <main className="min-h-screen bg-slate-100">
                seller analytics

            </main>
            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>

            </div>
  );
}