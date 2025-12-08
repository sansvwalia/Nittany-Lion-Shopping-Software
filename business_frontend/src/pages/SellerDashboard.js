import React, { useState } from "react";
import CreateTicket from "../components/CreateTicket";
import Modal from "../components/Modal";
import CreateListing from "../components/CreateListing";
import "../App.css";

export default function SellerDashboard() {
    const [showListingForm, setShowListingForm] = useState(false);
    const [showTicketForm, setShowTicketForm] = useState(false);

    function handleTicketSubmit(data) {
        console.log("Ticket submitted:", data); // TODO: send to backend
        setShowTicketForm(false);
    }

   return (
    <div className="App">
        <header className="App-header">Seller Dashboard</header>

        <main>
            <h2>Welcome, Seller!</h2>
            <p>Manage your listings and contact support anytime.</p>

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

        <Modal show={showTicketForm} onClose={() => setShowTicketForm(false)}>
            <CreateTicket onSubmit={handleTicketSubmit} />
        </Modal>
    </div>
);
}
