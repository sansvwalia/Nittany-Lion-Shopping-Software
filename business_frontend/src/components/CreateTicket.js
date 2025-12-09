import React, { useState } from "react";

export default function CreateTicket({ onSubmit }) {
    const [formData, setFormData] = useState({
        subject: "",
        description: "",
        category: "General",
        businessName: "",
        customerPhone: "",
        businessAddress: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit?.(formData);
        setFormData({
            subject: "",
            description: "",
            category: "General",
            businessName: "",
            customerPhone: "",
            businessAddress: "",
        });
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

                {/* Conditionally show extra fields */}
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
                            placeholder="Customer Service Phone Number"
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
                    style={{
                        padding: "12px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        resize: "vertical",
                        minHeight: "100px",
                    }}
                />

                <button type="submit" className="button">Submit Ticket</button>
            </form>
        </div>
    );
}
