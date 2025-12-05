import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/register", {
                email,
                password,
                accountType,
            });

            if (res.data.success) {
                alert("Registration successful! You can now log in.");
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
                <p>Create a New Account</p>
            </header>

            <main>
                <div className="login-container">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email Address"
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
                        <select
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            required
                        >
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                        <button type="submit" className="button">Register</button>
                    </form>

                    {error && <p className="error">{error}</p>}
                                        <div className="register-link">
                        <p>Already have an account? <span onClick={() => navigate("/Register")}>Login here</span></p>
                    </div>
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
