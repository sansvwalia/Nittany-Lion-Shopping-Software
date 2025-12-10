import React, { useState } from "react";

export default function EditListing({ listing, onSubmit }) {
    const [form, setForm] = useState({ ...listing });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);
    }
    async function handleSubmit(e) {
    e.preventDefault();
        try {
        const res = await fetch(
            `http://localhost:5000/products/update/${listing.ProductID}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    description: form.description,
                    price: form.price,
                    quantity: form.quantity,
                }),
            }
        );

        const data = await res.json();

        if (res.ok && data.success) {
            alert("Listing updated successfully!");
            onSubmit(form);
        } else {
            alert(data.error || "Failed to update listing.");
        }
    } catch (err) {
        console.error("Edit listing error:", err);
        alert("Server error — please try again later.");
    }
}

    return (
        <div>
            <h2>Edit Product Listing</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                {/* Category locked */}
                <input
                    type="text"
                    value={form.category}
                    readOnly
                    style={{ backgroundColor: "#eee", color: "#555", cursor: "not-allowed" }}
                />
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <input
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="button">Save Changes</button>
            </form>
        </div>
    );
}
