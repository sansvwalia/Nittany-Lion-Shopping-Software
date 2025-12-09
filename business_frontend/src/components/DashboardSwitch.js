import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DashboardSwitcher() {
    const navigate = useNavigate();

    function handleSwitch() {
    let role = localStorage.getItem("userRole");
    if (role) role = role.replace(/['"\s]/g, "").toLowerCase();

    console.log("switch clicked – current role:", role);
    if (role === "seller" || role === "helpdesk") {
        localStorage.setItem("userRole", "buyer");
        navigate("/buyer", { replace: true });
    } else {
        localStorage.setItem("userRole", "seller");
        navigate("/seller", { replace: true });
    }
}

    const bottomPosition = "100px";

    return (
        <div
            className="tooltip"
            style={{
                position: "fixed",
                right: "20px",
                bottom: bottomPosition,
                zIndex: 5000,
            }}
        >
            <button
                className="button"
                style={{
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3em",
                    backgroundColor: "#041E42",
                }}
                onClick={handleSwitch}
            >
                ⇆
            </button>
            <span className="tooltip-text">
                Switch Dashboard
            </span>
        </div>
    );
}
