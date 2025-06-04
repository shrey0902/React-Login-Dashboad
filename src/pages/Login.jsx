import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State to manage and display error messages within the component
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear any previous error messages before validation
        setErrorMessage("");

        // Input validation: Check if email or password fields are empty
        if (email.trim() === "" || password.trim() === "") {
            setErrorMessage("Please enter both email and password.");
            return; // Stop the function if validation fails
        }

        // Email format validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return; // Stop the function if validation fails
        }

        // Simulate successful login by saving a state to localStorage
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to the dashboard page upon successful login
        navigate("/dashboard");
    };

    return (
        <div style={{
            color: "white", 
            minHeight: "100vh", 
            display: "flex",
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            padding: "2rem", 
            fontFamily: "'Inter', sans-serif", 
            background: "linear-gradient(135deg, rgba(22, 189, 201, 0.9), rgba(122, 1, 1, 0.9))",
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)", 
        }}>
            <h1 style={{
                // Styling for the main welcome title
                marginBottom: "2.5rem", // Space below the title
                color: "#ffcb05", // Vibrant yellow, reminiscent of Pikachu
                fontFamily: "'Inter', sans-serif", // Keep Inter for this title
                fontSize: "clamp(1.8rem, 5vw, 3rem)", // Responsive font size
                textShadow: "4px 4px #363636", // Strong shadow for a bold look
                letterSpacing: "2px", // Spacing between letters
            }}>
                Welcome to PokéWorld
            </h1>
            <div style={{
                // Container to center the login form card
                display: "flex",
                justifyContent: "center", // Centers horizontally
                alignItems: "center", // Centers vertically
                height: "100%", // Takes full height of its parent
                width: "100vw", // Takes full viewport width
                boxSizing: "border-box" // Includes padding and border in the element's total width and height
            }}>
                <div style={{
                    // The actual login form card styling
                    background: "#fff", // White background for the card
                    padding: "3rem", // Generous padding inside the card
                    borderRadius: "12px", // More rounded corners for a softer look
                    backgroundColor: "rgba(227, 237, 245, 0.95)", // Slightly transparent light blue/grey
                    // Enhanced box shadow for a lifted, modern effect
                    boxShadow: "0 10px 30px rgba(46, 133, 127, 0.3), 0 0 0 5px rgba(255, 255, 255, 0.2) inset",
                    width: "100%", // Takes full width of its parent (up to maxWidth)
                    maxWidth: "450px", // Maximum width for the form card
                    border: "2px solid #3982B2", // Blue border, another Pokémon color
                    position: "relative", // Needed for potential future absolute positioning of elements
                    overflow: "hidden", // Ensures content stays within rounded borders
                }}>
                    <h2 style={{
                        // Styling for the "Login" heading inside the card
                        textAlign: "center",
                        color: "#333", // Dark grey for good contrast
                        fontWeight: "bold",
                        marginBottom: "2rem", // Space below the heading
                        fontSize: "2rem", // Larger font size
                        fontFamily: "'Inter', sans-serif", // Keep Inter for this heading
                        textShadow: "2px 2px #bbb", // Subtle shadow for depth
                    }}>
                        Login
                    </h2>
                    {/* Conditional rendering for error messages */}
                    {errorMessage && (
                        <p style={{
                            color: "#ff3333", // Bright red for error text
                            backgroundColor: "rgba(255, 0, 0, 0.1)", // Light red background for the error box
                            padding: "0.8rem",
                            borderRadius: "5px",
                            marginBottom: "1.5rem", // Space below the error message
                            textAlign: "center",
                            fontSize: "0.9rem",
                            border: "1px solid #ff3333", // Red border around the error box
                        }}>
                            {errorMessage}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label htmlFor="email" style={{
                                color: "#333",
                                marginBottom: "0.5rem",
                                display: "block", // Makes the label take its own line
                                fontWeight: "600", // Bolder label text
                            }}>Email:</label>
                            <input
                                id="email" // Link label to input for accessibility
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="ash.ketchum@pokeworld.com" // More descriptive placeholder
                                style={{
                                    width: "100%",
                                    padding: "0.8rem 1rem", // More padding inside the input field
                                    marginTop: "0.3rem",
                                    border: "1px solid #ccc", // Light grey border
                                    borderRadius: "6px", // Slightly rounded input fields
                                    fontSize: "1rem",
                                    boxSizing: "border-box", // Ensures padding doesn't increase total width
                                    transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition for focus
                                    outline: "none", // Removes default outline on focus
                                }}
                                // Dynamic styling on focus and blur for visual feedback
                                onFocus={(e) => { e.target.style.borderColor = "#007bff"; e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.25)"; }}
                                onBlur={(e) => { e.target.style.borderColor = "#ccc"; e.target.style.boxShadow = "none"; }}
                            />
                        </div>
                        <div style={{ marginBottom: "2rem" }}>
                            <label htmlFor="password" style={{
                                color: "#333",
                                marginBottom: "0.5rem",
                                display: "block",
                                fontWeight: "600",
                            }}>Password:</label>
                            <input
                                id="password" // Link label to input for accessibility
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••" // Generic password placeholder
                                style={{
                                    width: "100%",
                                    padding: "0.8rem 1rem",
                                    marginTop: "0.3rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    fontSize: "1rem",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                    outline: "none",
                                }}
                                // Dynamic styling on focus and blur for visual feedback
                                onFocus={(e) => { e.target.style.borderColor = "#007bff"; e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.25)"; }}
                                onBlur={(e) => { e.target.style.borderColor = "#ccc"; e.target.style.boxShadow = "none"; }}
                            />
                        </div>
                        <button type="submit" style={{
                            width: "100%",
                            padding: "1rem", // Larger button for easier interaction
                            backgroundColor: "#007bff", // Standard blue for primary action
                            color: "white",
                            border: "none",
                            borderRadius: "8px", // More rounded button
                            cursor: "pointer", // Indicates clickable element
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            transition: "background-color 0.3s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transitions for interactivity
                            boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)", // Subtle shadow for depth
                            fontFamily: "'Inter', sans-serif", // Keep Inter for button text
                            letterSpacing: "1px",
                            // Adding a subtle gradient to the button for a modern look
                            backgroundImage: "linear-gradient(45deg, #007bff, #0056b3)",
                        }}
                            // Hover and active effects for the button
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0056b3";
                                e.target.style.boxShadow = "0 6px 15px rgba(0, 123, 255, 0.4)";
                                e.target.style.backgroundImage = "linear-gradient(45deg, #0056b3, #003f7f)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#007bff";
                                e.target.style.boxShadow = "0 4px 10px rgba(0, 123, 255, 0.3)";
                                e.target.style.backgroundImage = "linear-gradient(45deg, #007bff, #0056b3)";
                            }}
                            onMouseDown={(e) => e.target.style.transform = "translateY(2px)"} // Slight press effect
                            onMouseUp={(e) => e.target.style.transform = "translateY(0)"}
                        >
                            Login to PokéWorld
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
