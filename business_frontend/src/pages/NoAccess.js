import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function NoAccess() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">Access Restricted</header>

            <main
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "70vh",
                    padding: "20px",
                }}
            >
                <h2 style={{ color: "#041E42", marginBottom: "10px" }}>
                    You don’t have access to this page.
                </h2>
                <p style={{ marginBottom: "30px", fontSize: "1.1em", color: "#333" }}>
                    This section is for registered sellers only.
                </p>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <button
                        className="button"
                        style={{
                            minWidth: "200px",
                            fontSize: "1em",
                        }}
                        onClick={() => navigate("/buyer")}
                    >
                        Go to Buyer Dashboard
                    </button>

                    <button
                        className="button"
                        style={{
                            minWidth: "200px",
                            backgroundColor: "#0b2e66",
                            fontSize: "1em",
                        }}
                        onClick={() => navigate("/registerSeller")}
                    >
                        Register / Upgrade as Seller
                    </button>
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
