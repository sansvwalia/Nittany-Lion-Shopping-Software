import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import HelpDeskDashboard from "./pages/HelpDeskDashboard";
import Register from "./pages/Register";
import RegisterUser from "./pages/RegisterUser";
import RegisterSeller from "./pages/RegisterSeller"
import ProductsListPage from "./pages/ProductsListPage";
import DBViewerPage from "./pages/DBViewerPage";
import EditRecord from "./pages/recordeditor";
import ProductAnalytics from "./pages/ProductAnalytics";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/seller" element={<SellerDashboard />} />
                <Route path="/buyer" element={<BuyerDashboard />} />
                <Route path="/helpdesk" element={<HelpDeskDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path ="/registerUser" element={<RegisterUser/>} />
                <Route path ="/registerSeller" element={<RegisterSeller/>} />
                <Route path="/dbviewer" element={<DBViewerPage />} />
                <Route path="/products" element={<ProductsListPage />} />
                <Route path="/recordeditor" element={<EditRecord />} />
                <Route path="/productanalytics" element={<ProductAnalytics />} />
            </Routes>
        </Router>
    );
}

export default App;
