import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [accountType, setAccountType] = useState("user");
    const navigate = useNavigate();

    const handleContinue = (e) => {
        e.preventDefault();

        if (accountType === "user") {
            navigate("/registerUser");
        } else if (accountType === "seller") {
            navigate("/registerSeller");
        } else {
            alert("Please select a valid account type.");
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p>Select Account Type</p>
            </header>

            <main>
                <div className="login-container">
                    <h2>Register As</h2>
                    <form onSubmit={handleContinue}>
                        <select
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            required
                        >
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                        <button type="submit" className="button">Continue</button>
                    </form>
                </div>
            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
