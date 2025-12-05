import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/registerUser", {
                email,
                password,
            });

            if (res.data.success) {
                alert("User account created! You can now log in.");
                navigate("/login");
            } else {
                setError(res.data.message || "Registration failed.");
            }
        } catch {
            setError("Server error, please try again.");
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p>User Registration</p>
            </header>

            <main>
                <div className="login-container">
                    <h2>Create Account</h2>
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
                        <button type="submit" className="button">Register</button>
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
