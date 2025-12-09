import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DashboardSwitcher() {
    const navigate = useNavigate();
    const currentRole = localStorage.getItem("userRole");

    function handleSwitch() {
        if (currentRole === "seller") {
            localStorage.setItem("userRole", "buyer");
            navigate("/buyer");
        } else {
            localStorage.setItem("userRole", "seller");
            navigate("/seller");
        }
    }

    const bottomPosition = currentRole === "buyer" ? "100px" : "180px";

    return (
        <div
            className="tooltip"
            style={{
                position: "fixed",
                bottom: bottomPosition,
                right: "20px",
                zIndex: 1500,
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
                {currentRole === "seller"
                    ? "Switch to Buyer Dashboard"
                    : "Switch to Seller Dashboard"}
            </span>
        </div>
    );
}
