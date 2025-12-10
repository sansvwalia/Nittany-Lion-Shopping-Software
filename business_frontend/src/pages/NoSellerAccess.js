import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function NoSellerAccess() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.pointerEvents = "auto";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.pointerEvents = "auto";
        };
    }, []);

    return (
        <div className="App">
            <header className="App-header">Seller Access Restricted</header>

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
                    You don’t have access to the seller page.
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
                        onClick={() => navigate("/registerSeller")}
                        style={{
                            minWidth: "220px",
                            backgroundColor: "#0b2e66",
                        }}
                    >
                        Register / Upgrade as Seller
                    </button>

                    <button
                        className="button"
                        onClick={() => navigate("/buyer", { replace: true })}  // ⬅ replace history entry
                        style={{
                            minWidth: "200px",
                        }}
                    >
                        Return to Buyer Dashboard
                    </button>
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
