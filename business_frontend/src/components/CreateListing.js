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

   async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
        name: form.title,
        description: form.description,
        quantity: form.quantity,
        price: form.price,
        categoryID: form.category || 1, // use your current default value
        tagID: null,
        businessID: localStorage.getItem("businessID"), // or set when seller logs in
    };

    try {
        const res = await fetch("http://localhost:5000/products/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            alert("Listing created successfully!");
            onSubmit(payload);
            setForm({
                title: "",
                description: "",
                category: "",
                price: "",
                quantity: "",
            });
        } else {
            alert(data.error || "Failed to create listing.");
        }
    } catch (err) {
        console.error("Create listing error:", err);
        alert("Server error — please try again later.");
    }
}
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
