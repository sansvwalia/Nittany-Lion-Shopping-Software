import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTicket from "../components/CreateTicket";
import Modal from "../components/Modal";
import CreateListing from "../components/CreateListing";
import EditListing from "../components/EditListing"
import "../App.css";

export default function SellerDashboard() {
    const [showListingForm, setShowListingForm] = useState(false);
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [editingListing, setEditingListing] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    // Temp data for testing
    const [products] = useState([
        { id: 1, title: "Wireless Mouse", price: 25.99, quantity: 14 },
        { id: 2, title: "Gaming Keyboard", price: 89.99, quantity: 7 },
    ]);

    const [orders] = useState([
        { id: 101, productTitle: "Wireless Mouse", buyerName: "Jane Doe", total: 25.99 },
        { id: 102, productTitle: "Gaming Keyboard", buyerName: "Alex Smith", total: 89.99 },
        { id: 103, productTitle: "Gaming Keyboard", buyerName: "Alex Smith", total: 89.99 },
        { id: 104, productTitle: "Gaming Keyboard", buyerName: "Alex Smith", total: 89.99 },
        { id: 105, productTitle: "Gaming Keyboard", buyerName: "Alex Smith", total: 89.99 },
        { id: 106, productTitle: "Gaming Keyboard", buyerName: "Alex Smith", total: 89.99 },
    ]);

    function handleTicketSubmit(data) {
        console.log("Ticket submitted:", data); // TODO: send to backend
        setShowTicketForm(false);
    }

    const navigate = useNavigate();

function handleLogout() {
    localStorage.removeItem("userToken");
    sessionStorage.clear();

    navigate("/");
}

   return (
    <div className="App">
        <header className="App-header">Seller Dashboard</header>

        <main>
            <div className="seller-content">
                {/* Product Listings */}
                <section className="product-list">
                    <h2>Your Listings</h2>
                    {products.map((p) => (
                        <div key={p.id} className="product-card">
                            <h3>{p.title}</h3>
                            <p>${p.price} | Qty: {p.quantity}</p>
                            <div>
                                <button
                                    className="button"
                                    onClick={() => setEditingListing(p)}
                                >
                                    Edit
                                </button>
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
                    ))}
                </section>

                {/* Order History */}
                <section className="order-history">
                    <h2>Order History</h2>
                    {orders.map((o) => (
                        <div key={o.id} className="order-card">
                            <p>
                                <strong>{o.productTitle}</strong> — bought by {o.buyerName}
                            </p>
                            <p>Total: ${o.total}</p>
                        </div>
                    ))}
                </section>
            </div>

            {/* Create Listing Button */}
            <div
                className="tooltip"
                style={{
                    position: "fixed",
                    bottom: "100px",
                    right: "20px",
                }}
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

        {/* Helpdesk Button */}
        <div
            className="tooltip"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
            }}
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

        <div
            className="tooltip tooltip-left"
            style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
            }}
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

        {/* Ticket Modal */}
        <Modal show={showTicketForm} onClose={() => setShowTicketForm(false)}>
            <CreateTicket onSubmit={handleTicketSubmit} />
        </Modal>

        {/* Edit Listing Modal */}
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

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
            <div style={{ textAlign: "center" }}>
                <h3>Confirm Deletion</h3>
                <p>
                    Are you sure you want to delete{" "}
                    <strong>{selectedListing?.title}</strong>?
                </p>
                <button
                    className="button"
                    onClick={() => {
                        console.log("Deleted listing:", selectedListing);
                        setShowDeleteConfirm(false);
                    }}
                >
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
    </div>
);
}
