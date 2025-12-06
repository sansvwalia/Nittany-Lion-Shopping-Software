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
import UsersListPage from "./pages/UsersListPage";
import TicketsListPage from "./pages/TicketsListPage";
import SellersListPage from "./pages/SellersListPage";
import ProductsListPage from "./pages/ProductsListPage";

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
                <Route path="/ticketslist" element={<TicketsListPage />} />
                <Route path="/userslist" element={<UsersListPage />} />
                <Route path="/sellerslist" element={<SellersListPage />} />
                <Route path="/productslist" element={<ProductsListPage />} />
            </Routes>
        </Router>
    );
}

export default App;
