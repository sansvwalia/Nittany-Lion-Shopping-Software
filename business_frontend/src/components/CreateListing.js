import React, { useState } from "react";

export default function CreateListing({ onSubmit }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

   const handleSubmit = (e) => {
    e.preventDefault();

	// Temporary category check
    const validCategories = ["Electronics", "Apparel", "Books", "Furniture"];
    const userCategory = form.category.trim().toLowerCase();
    const isValid = validCategories.some(
        (cat) => cat.toLowerCase() === userCategory
    );

    if (!isValid) {
        setError("Category does not exist. Please contact Helpdesk to create it.");
        return;
    }

    onSubmit?.(form);
    setForm({ title: "", description: "", category: "", price: "", quantity: "" });
};

    return (
        <div>
            <h2>Create New Product Listing</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    placeholder="Product Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    style={{ minHeight: "80px" }}
                />
                <input
                    name="category"
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                />
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Price ($)"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={form.quantity}
					                    onChange={handleChange}
                    required
                />

                {error && <p className="error">{error}</p>}
                <button type="submit" className="button">Submit Listing</button>
            </form>
        </div>
    );
}
