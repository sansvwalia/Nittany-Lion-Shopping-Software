import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function NoAccess() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">Access Restricted</header>

            <main style={{ textAlign: "center", marginTop: "60px" }}>
                <h2>You don’t have access to this page.</h2>
                <p style={{ marginBottom: "30px" }}>
                    This section is for registered sellers only.
                </p>
                <button
                    className="button"
                    style={{ marginRight: "15px" }}
                    onClick={() => navigate("/buyer")}
                >
                    Go to Buyer Dashboard
                </button>
                <button
                    className="button"
                    onClick={() => navigate("/registerUser")}
                >
                    Register as Buyer
                </button>
            </main>
        </div>
    );
}
