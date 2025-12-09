import React, { useState } from "react";

export default function CreateTicket({ onSubmit }) {
    const [formData, setFormData] = useState({
        description: "",
        category: "General",
        businessName: "",
        customerPhone: "",
        businessAddress: "",
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
                    category: formData.category,
                    description: formData.description,
                    userEmail: localStorage.getItem("userEmail"),
                    businessName: formData.businessName || null,
                    customerPhone: formData.customerPhone || null,
                    businessAddress: formData.businessAddress || null,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess("Ticket created successfully!");
                setFormData({
                    description: "",
                    category: "General",
                    businessName: "",
                    customerPhone: "",
                    businessAddress: "",
                });
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
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option>General</option>
                    <option>Register Business</option>
                    <option>Technical Issue</option>
                    <option>Account</option>
                    <option>Order</option>
                </select>

                {/* Extra business fields for “Register Business” */}
                {formData.category === "Register Business" && (
                    <>
                        <input
                            type="text"
                            name="businessName"
                            placeholder="Business Name"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="customerPhone"
                            placeholder="Customer Service Number"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="businessAddress"
                            placeholder="Business Address"
                            value={formData.businessAddress}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

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
