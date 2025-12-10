import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(`${API_BASE_URL}/login`, { email, password });

            if (res.data.status === "success") {
                const role = res.data.role;

                // Navigate based on role
                if (role === "buyer") {
                    navigate("/buyer", { state: { welcomeMessage: "Welcome Buyer!" } });
                } else if (role === "seller") {
                    navigate("/seller", { state: { welcomeMessage: "Welcome Seller!" } });
                } else if (role === "helpdesk") {
                    navigate("/helpdesk", { state: { welcomeMessage: "Welcome Helpdesk!" } });
                } else {
                    setError("Role not recognized.");
                }
            } else {
                // Show server error message exactly
                setError(res.data.message || "Login failed.");
            }
        } catch (err) {
            console.error("Login error:", err);
            // Show the actual error message if backend returned one
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Server error. Try again.");
            }
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
