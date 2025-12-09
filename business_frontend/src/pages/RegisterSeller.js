import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterSeller() {
    const [businessName, setBusinessName] = useState("");
    const [customerServiceNumber, setCustomerServiceNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const email = localStorage.getItem("userEmail");

        try {
            const res = await axios.post("http://localhost:5000/users/upgradeToSeller", {
                email,
                businessName,
                customerServiceNumber,
            });

            if (res.data.success) {
                setSuccess("You are now registered as a seller!");
                localStorage.setItem("userRole", "seller");
                setTimeout(() => navigate("/seller"), 1500);
            } else {
                setError(res.data.error || "Validation failed, please check inputs.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error, please try again.");
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Upgrade Your Account</h1>
                <p>Become a Nittany Business Seller</p>
            </header>

            <main>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
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
                            Verify Business
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
