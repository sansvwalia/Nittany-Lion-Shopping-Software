import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import CreateTicket from "../components/CreateTicket";
import CreateListing from "../components/CreateListing";
import EditListing from "../components/EditListing";
import "../App.css";

export default function SellerDashboard() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [showListingForm, setShowListingForm] = useState(false);
    const [editingListing, setEditingListing] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    const userEmail = localStorage.getItem("userEmail");

    // Fetch seller data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodRes = await fetch(`http://localhost:5000/products/seller/${userEmail}`);
                const productData = await prodRes.json();
                setProducts(productData);

                const orderRes = await fetch(`http://localhost:5000/orders/seller/${userEmail}`);
                const orderData = await orderRes.json();
                setOrders(orderData);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        if (userEmail) fetchData();
    }, [userEmail]);

    // Log out logic
    function handleLogout() {
        localStorage.removeItem("userToken");
                sessionStorage.clear();
        navigate("/");
    }

    // Handle deletions (local until backend integrated)
    function handleDeleteConfirmed() {
        setProducts(prev => prev.filter(p => p.id !== selectedListing.id));
        setShowDeleteConfirm(false);
    }

    return (
        <div className="App">
            <header className="App-header">Seller Dashboard</header>

            <main>
                <div className="seller-content">
                    <section className="product-list">
                        <h2>Your Listings</h2>
                        {products.length > 0 ? (
                            products.map((p) => (
                                <div key={p.ProductID || p.id} className="product-card">
                                    <h3>{p.Name}</h3>
                                    <p>${p.Price} | Qty: {p.Quantity}</p>
                                    <div>
                                        <button className="button" onClick={() => setEditingListing(p)}>Edit</button>
                                        <button
                                            className="button"
                                            style={{ backgroundColor: "#b30000" }}
                                            onClick={() => {
                                                setSelectedListing(p);
                                                setShowDeleteConfirm(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products listed yet.</p>
                        )}
                    </section>
                    <section className="order-history">
                        <h2>Order History</h2>
                        {orders.length > 0 ? (
                            [...orders].reverse().map((o) => (
                                <div key={o.OrderID || o.id} className="order-card">
                                    <p>
                                        <strong>{o.product || o.ProductName}</strong> — bought by {o.buyer || o.BuyerEmail}
                                    </p>
                                    <p>Total: ${o.price || o.Total}</p>
                                </div>
                            ))
                        ) : (
                            <p>No orders yet.</p>
                        )}
                    </section>
                </div>
                <div
                    className="tooltip"
                    style={{ position: "fixed", bottom: "100px", right: "20px" }}
                >
                    <button
                        className="button"
                        style={{
                            borderRadius: "50%",
                                                        width: "60px",
                            height: "60px",
                            fontSize: "1.5em",
                        }}
                        onClick={() => setShowListingForm(true)}
                    >
                        +
                    </button>
                    <span className="tooltip-text">Create New Listing</span>
                </div>

                <Modal show={showListingForm} onClose={() => setShowListingForm(false)}>
                    <CreateListing
                        onSubmit={(data) => {
                            console.log("Listing created:", data);
                            setShowListingForm(false);
                        }}
                    />
                </Modal>
            </main>
            <div
                className="tooltip"
                style={{ position: "fixed", bottom: "20px", right: "20px" }}
            >
                <button
                    className="button"
                    style={{
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        fontSize: "1.5em",
                    }}
                    onClick={() => setShowTicketForm(true)}
                >
                    ?
                </button>
                <span className="tooltip-text">Contact Helpdesk</span>
            </div>

            <Modal show={showTicketForm} onClose={() => setShowTicketForm(false)}>
                <CreateTicket onSubmit={() => setShowTicketForm(false)} />
            </Modal>
            <Modal show={!!editingListing} onClose={() => setEditingListing(null)}>
                {editingListing && (
                    <EditListing
                        listing={editingListing}
                        onSubmit={(updated) => {
                            console.log("Edited listing:", updated);
                            setEditingListing(null);
                        }}
                    />
                )}
            </Modal>
            <Modal show={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                <div style={{ textAlign: "center" }}>
                    <h3>Confirm Deletion</h3>
                    <p>
                        Are you sure you want to delete{" "}
                        <strong>{selectedListing?.Name}</strong>?
                    </p>
                    <button className="button" onClick={handleDeleteConfirmed}>
                        Yes, Delete
                    </button>
                    <button
                        className="button"
                        style={{ backgroundColor: "#999", marginLeft: "10px" }}
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
            <div
                className="tooltip tooltip-left"
                style={{ position: "fixed", bottom: "20px", left: "20px" }}
            >
                <button
                    className="button"
                    style={{
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        fontSize: "1.3em",
                        backgroundColor: "#b30000",
                    }}
                    onClick={handleLogout}
                >
                    ↩
                </button>
                <span className="tooltip-text">Sign Out</span>
            </div>
        </div>
    );
}
