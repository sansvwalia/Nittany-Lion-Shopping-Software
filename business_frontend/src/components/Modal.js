import React, { useState } from "react";
import Modal from "./Modal";

export default function HelpDeskDashboard() {
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        // send ticket to backend here 📨
        setShowForm(false);
    };

    return (
        <div className="App">
            <header className="App-header">Helpdesk</header>

            <main>
                <button className="button" onClick={() => setShowForm(true)}>
                    Create Ticket
                </button>

                <Modal show={showForm} onClose={() => setShowForm(false)}>
                    <h2>Create Support Ticket</h2>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Subject" required />
                        <textarea placeholder="Describe the issue..." required />
                        <br />
						<button type="submit" className="button">Submit</button>
                    </form>
                </Modal>
            </main>
        </div>
    );
}
