
import { useNavigate } from "react-router-dom";

export default function HelpDeskDashboard() {
  const navigate = useNavigate();

  return (
            <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p>Help Desk Dashboard</p>
            </header>

            <main className="min-h-screen bg-slate-100">
                

              <div className="button-container">
                  <button className="button" onClick={() => navigate("/dbviewer")}>
                      Database Viewer
                  </button>

                  <button className="button" onClick={() => navigate("/recordeditor")}>
                      Update Records
                  </button>
              </div>


            </main>
            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>

            </div>
  );
}


