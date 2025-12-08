import React, { useState } from "react";
import CreateTicket from "../components/CreateTicket";
import Modal from "../components/Modal";
import "../App.css"; // brings in your button + layout styles

export default function SellerDashboard() {
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
            </main>

            {/* Floating helpdesk button */}
            <button
                className="button"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    fontSize: "1.5em",
                }}
                onClick={() => setShowTicketForm(true)}
            >
                ?
            </button>

            {/* Ticket Modal */}
            <Modal show={showTicketForm} onClose={() => setShowTicketForm(false)}>
                <CreateTicket onSubmit={handleTicketSubmit} />
            </Modal>
        </div>
    );
}
