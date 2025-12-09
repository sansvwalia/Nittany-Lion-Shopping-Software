import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (data.success) {
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", data.role);

            // Redirect based on role
            if (data.role === "helpdesk") navigate("/helpdesk");
            else if (data.role === "seller") navigate("/seller");
            else navigate("/buyer");
        } else {
            setError("Invalid email or password.");
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
                <p>User Login Page</p>
            </header>

            <main>
                <div className="login-container">
                    <h2>Sign In</h2>
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
                        <button type="submit" className="button">Login</button>
                    </form>

                    {error && <p className="error">{error}</p>}

                    <div className="register-link">
                        <p>New user? <span onClick={() => navigate("/register")}>Register here</span></p>
                    </div>
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
