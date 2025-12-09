import React, { useState } from "react";

export default function CreateTicket({ onSubmit }) {
    const [formData, setFormData] = useState({
        subject: "",
        description: "",
        category: "General",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch("http://localhost:5000/tickets/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: formData.subject,
                    description: formData.description,
                    category: formData.category,
                    userEmail: localStorage.getItem("userEmail"), // logged‑in user
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess("Ticket created successfully!");
                setFormData({ subject: "", description: "", category: "General" });
                onSubmit?.(formData);
            } else {
                setError(data.error || "Failed to create ticket. Please try again.");
            }
        } catch (err) {
            console.error("Ticket submission error:", err);
            setError("Server error. Please try again later.");
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Create Support Ticket</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="subject"
                    placeholder="Ticket Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />

                <select name="category" value={formData.category} onChange={handleChange}>
                                        <option>General</option>
                    <option>Register Business</option>
                    <option>Technical Issue</option>
                    <option>Account</option>
                    <option>Order</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Describe your issue..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="button">
                    Submit Ticket
                </button>

                {error && <p className="error">{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
            </form>
        </div>
    );
}
