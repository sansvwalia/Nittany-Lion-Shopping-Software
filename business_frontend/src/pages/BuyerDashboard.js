<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function SellerDashboard() {
    return <h2>Welcome, Buyer!</h2>;
=======
import { useState } from "react";
import "../App.css";

const orders = [
  { id: 1, item: "Laptop Sleeve", date: "2025-01-12", status: "Delivered" },
  { id: 2, item: "USB-C Charger", date: "2025-01-20", status: "Shipped" },
];

const recommendedProducts = [
  { id: 101, name: "Wireless Mouse", price: "$18.99" },
  { id: 102, name: "Portable SSD", price: "$69.99" },
  { id: 103, name: "LED Desk Lamp", price: "$24.50" },
];

function BuyerDashboard() {
  const [section, setSection] = useState("orders");
  const [cart, setCart] = useState([]);
  const [recommended] = useState(recommendedProducts);

  // Account local state
  const [account, setAccount] = useState({
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2023-06-02",
  });

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: account.name,
    email: account.email,
    password: "",
  });

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Save account changes
  const saveAccountChanges = () => {
    setAccount({
      ...account,
      name: editData.name,
      email: editData.email,
      // password wouldn't be shown, but we can store it or send to backend
    });
    setShowEditModal(false);
  };

  return (
    <div className="seller-content">

      {/* Navigation */}
      <div className="button-container">
        <button className="button" onClick={() => setSection("orders")}>Orders</button>
        <button className="button" onClick={() => setSection("recommended")}>Recommended</button>
        <button className="button" onClick={() => setSection("cart")}>Cart ({cart.length})</button>
        <button className="button" onClick={() => setSection("account")}>Account</button>
      </div>

      {/* Orders */}
      {section === "orders" && (
        <div className="order-history">
          <h2>My Orders</h2>
          {orders.map(o => (
            <div key={o.id} className="order-card">
              <strong>{o.item}</strong>
              <p>Order Date: {o.date}</p>
              <p>Status: {o.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recommended */}
      {section === "recommended" && (
        <div className="product-list">
          <h2>Recommended Products</h2>
          {recommended.map(p => (
            <div key={p.id} className="product-card">
              <strong>{p.name}</strong>
              <p>Price: {p.price}</p>
              <button className="button" onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}

      {/* Cart */}
      {section === "cart" && (
        <div className="product-list">
          <h2>My Cart</h2>
          {cart.length === 0 && <p>Your cart is empty.</p>}
          {cart.map((item, index) => (
            <div key={index} className="product-card">
              <strong>{item.name}</strong>
              <p>Price: {item.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Account */}
      {section === "account" && (
        <div className="product-list">
          <h2>Account Information</h2>

          <p><strong>Name:</strong> {account.name}</p>
          <p><strong>Email:</strong> {account.email}</p>
          <p><strong>Member Since:</strong> {account.joinDate}</p>

          <button className="button" style={{ marginTop: "20px" }}
            onClick={() => {
              setEditData({
                name: account.name,
                email: account.email,
                password: "",
              });
              setShowEditModal(true);
            }}
          >
            Edit Account
          </button>
        </div>
      )}

      {/* EDIT ACCOUNT MODAL */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Account Information</h2>

            <form>
              <input
                type="text"
                placeholder="Full Name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email Address"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="New Password"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              />

              <button type="button" className="button" onClick={saveAccountChanges}>
                Save Changes
              </button>

              <button
                type="button"
                className="button"
                style={{ backgroundColor: "gray", marginTop: "10px" }}
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
>>>>>>> MidReviewSubmission
}

export default BuyerDashboard;
