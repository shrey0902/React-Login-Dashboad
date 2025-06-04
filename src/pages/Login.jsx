import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            alert("Please enter email and password");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Save login state
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to dashboard
        navigate("/dashboard");
    };

    return (
        <div style={{
            backgroundColor: "rgba(199, 33, 7, 0.86)",       // dark background
            color: "white",                
            minHeight: "100vh",            
            display: "flex",               
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem", }}>
            <h1 style={{ marginBottom: "2rem", color: "#ffcb05", fontFamily: "Inter, sans-serif" }}>
                Welcome to PokéWorld
            </h1>
        <div style={{
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "rgba(57, 130, 178, 0.86)",
            alignItems: "center",
            height: "100%",
            width: "100vw",
            boxSizing: "border-box"
        }}>
            <div style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "8px",
                backgroundColor: "rgba(227, 237, 245, 0.86)",
                boxShadow: "0 2px 8px rgba(46, 133, 127, 0.1)",
                width: "100%",
                maxWidth: "400px"
            }}>
                <h2 style={{ textAlign: "center" ,color:"Black", fontWeight:"bold"}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{color:"black"}}>Email:</label><br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                        />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ color: "black" }}>Password:</label><br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                        />
                    </div>
                    <button type="submit" style={{
                        width: "100%",
                        padding: "0.5rem",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Login;
