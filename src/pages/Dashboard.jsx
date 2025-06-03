import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [pokemonList, setPokemonList] = useState([]);

    // Redirect if not logged in
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
            navigate("/");
        }
    }, [navigate]);

    // Fetch Pokémon data
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
                const data = await res.json();
                setPokemonList(data.results);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            }
        }
        fetchData();
    }, []);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    return (
        <div style={{
            padding: "2rem", minHeight: "100vh", boxSizing: "border-box",
            overflowX: "hidden",}}>
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "2rem"
                }}>
                    <h1>Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Logout
                    </button>
                </div>
                <h2 style={{ marginBottom: "1rem" }}>Pokémon List</h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: "1.5rem",
                        justifyItems: "center",
                        width: "100%",
                    }}
                >
                    {pokemonList.map((pokemon, index) => {
                        const urlParts = pokemon.url.split("/").filter(Boolean);
                        const id = urlParts[urlParts.length - 1];
                        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "#fff",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                                    width: "150px",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={pokemon.name}
                                    style={{ width: "80px", height: "80px", marginBottom: "0.5rem" }}
                                />
                                <strong style={{ color: "#333" }}>
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                </strong>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
