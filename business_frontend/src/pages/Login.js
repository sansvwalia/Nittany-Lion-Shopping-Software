import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });

            if (res.data.success) {
                alert(`Welcome! Logged in as ${res.data.role}`);
                // navigate(`/dashboard/${res.data.role}`); //  add this for redirection later
            } else {
                setError(res.data.message || "Login failed");
            }
        } catch (err) {
            setError("Server error, please try again.");
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p style={{ fontSize: "1rem", marginTop: "5px" }}>User Login Page</p>
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
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
