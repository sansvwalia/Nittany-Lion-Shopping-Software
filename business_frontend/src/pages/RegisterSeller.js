import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterSeller() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [customerServiceNumber, setCustomerServiceNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // verify business with backend
            const check = await axios.post("http://localhost:5000/business/checkBusiness", {
                businessName,
                customerServiceNumber,
            });

            if (!check.data.exists) {
                setError("Business name and phone number do not match or do not exist.");
                return;
            }

            // proceed with registration if valid
            const res = await axios.post("http://localhost:5000/registerSeller", {
                email,
                password,
                businessName,
                customerServiceNumber,
            });

            if (res.data.success) {
                alert("Seller account created! You can now log in.");
                navigate("/login");
            } else {
                setError(res.data.message || "Registration failed.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error, please try again.");
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p>Seller Registration</p>
            </header>

            <main>
                <div className="login-container">
                    <h2>Business Details</h2>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="button">Register Business</button>
                    </form>

                    {error && <p className="error">{error}</p>}
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
