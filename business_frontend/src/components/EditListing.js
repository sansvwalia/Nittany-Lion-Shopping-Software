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
