import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function RegisterSeller() {
    const navigate = useNavigate();
    const loggedInEmail = localStorage.getItem("userEmail");

    const [email, setEmail] = useState(loggedInEmail || "");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [customerServiceNumber, setCustomerServiceNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const endpoint = loggedInEmail
                ? "http://localhost:5000/users/upgradeToSeller"
                : "http://localhost:5000/registerSeller";

            const payload = loggedInEmail
                ? {
                        email: loggedInEmail,
                        businessName,
                        customerServiceNumber,
                  }
                : {
                        email,
                        password,
                        businessName,
                        customerServiceNumber,
                  };

            const res = await axios.post(endpoint, payload);

            if (res.data.success) {
                setSuccess(
                    loggedInEmail
                        ? "Your account has been upgraded to a Seller!"
                        : "Seller account created! You can now log in."
                );

                if (loggedInEmail) {
                    localStorage.setItem("userRole", "seller");
                                        setTimeout(() => navigate("/seller"), 1500);
                } else {
                    setTimeout(() => navigate("/login"), 1500);
                }
            } else {
                setError(res.data.error || "Validation failed.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error, please try again.");
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Register as Seller</h1>
                <p>Join Nittany Business as a verified seller</p>
            </header>

            <main>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        {/* Only show login fields if user not logged in */}
                        {!loggedInEmail && (
                            <>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </>
                        )}

                        <input
                            type="text"
                            placeholder="Business Name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Customer Service Number"
                            value={customerServiceNumber}
                            onChange={(e) => setCustomerServiceNumber(e.target.value)}
                            required
                        />

                        <button type="submit" className="button">
                            {loggedInEmail ? "Upgrade Account" : "Register Business"}
                        </button>
                    </form>

                    {error && <p className="error">{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
