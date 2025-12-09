import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import HelpDeskDashboard from "./pages/HelpDeskDashboard";
import Register from "./pages/Register";
import RegisterUser from "./pages/RegisterUser";
import RegisterSeller from "./pages/RegisterSeller";
import ProductsListPage from "./pages/ProductsListPage";
import DBViewerPage from "./pages/DBViewerPage";
import EditRecord from "./pages/recordeditor";
import ProductAnalytics from "./pages/ProductAnalytics";
import NoAccess from "./pages/NoAccess";

function ProtectedRoute({ allowedRoles, children }) {
    const role = localStorage.getItem("userRole");
    if (!role) return <Navigate to="/" />;
    if (!allowedRoles.includes(role)) return <Navigate to="/noaccess" />;
    return children;
}

// Default redirect handler for the root path
function DefaultRedirect() {
    const role = localStorage.getItem("userRole");
    if (role === "seller") return <Navigate to="/seller" />;
    if (role === "buyer") return <Navigate to="/buyer" />;
    if (role === "helpdesk") return <Navigate to="/helpdesk" />;
    return <Login />; // fallback if not logged in
}

function App() {
    return (
        <Router>
            <Routes>
                {/* Root path automatically sends user to their role's dashboard */}
                <Route path="/" element={<DefaultRedirect />} />

                <Route
                    path="/seller"
                    element={
                                                <ProtectedRoute allowedRoles={["seller", "helpdesk"]}>
                            <SellerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/buyer"
                    element={
                        <ProtectedRoute allowedRoles={["buyer", "seller", "helpdesk"]}>
                            <BuyerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/helpdesk"
                    element={
                        <ProtectedRoute allowedRoles={["helpdesk"]}>
                            <HelpDeskDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/register" element={<Register />} />
                <Route path="/registerUser" element={<RegisterUser />} />
                <Route path="/registerSeller" element={<RegisterSeller />} />
                <Route path="/dbviewer" element={<DBViewerPage />} />
                <Route path="/products" element={<ProductsListPage />} />
                <Route path="/recordeditor" element={<EditRecord />} />
                <Route path="/productanalytics" element={<ProductAnalytics />} />
                <Route path="/noaccess" element={<NoAccess />} />
            </Routes>
        </Router>
    );
}

export default App;
