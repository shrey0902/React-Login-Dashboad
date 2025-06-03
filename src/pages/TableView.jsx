import { useEffect, useState, useMemo } from "react";
// Removed PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer imports from 'recharts'

// Removed COLORS constant

function TableView() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50; // Number of Pokémon per page

    // Modal states for detailed view
    const [showModal, setShowModal] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        async function fetchAllPokemon() {
            setLoading(true);
            try {
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
                const data = await res.json();

                // Fetch basic details for the table (name, type, height, and also store URL for full details)
                const detailedPromises = data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    const details = await res.json();

                    return {
                        name: details.name,
                        type: details.types.map(t => t.type.name).join(", "),
                        height: details.height,
                        url: pokemon.url, // Store the URL for fetching full details later
                    };
                });

                const detailedPokemon = await Promise.all(detailedPromises);
                setPokemonList(detailedPokemon);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        }

        fetchAllPokemon();
    }, []);

    // Effect to reset current page to 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    function handleSort(key) {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sorted = [...pokemonList].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setPokemonList(sorted);
        setSortConfig({ key, direction });
    }

    // Function to handle viewing Pokémon details in a modal
    const handleViewDetails = async (pokemonUrl) => {
        setModalLoading(true);
        setShowModal(true); // Show modal immediately with loading state
        try {
            const res = await fetch(pokemonUrl);
            const details = await res.json();
            setSelectedPokemon({
                name: details.name,
                type: details.types.map(t => t.type.name).join(", "),
                height: details.height,
                weight: details.weight,
                abilities: details.abilities.map(a => a.ability.name).join(", "),
                sprite: details.sprites.front_default || 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image', // Fallback image
                stats: details.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
            });
        } catch (error) {
            console.error("Failed to fetch Pokémon details:", error);
            setSelectedPokemon(null); // Clear selected pokemon on error
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPokemon(null); // Clear selected pokemon when modal closes
    };

    // Filtered list based on search term.
    const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPokemon = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // Generate page numbers for display
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Removed Pie Chart Data Processing (typeChartData useMemo)

    // Removed CustomTooltip component

    return (
        <div style={{ padding: "2rem", backgroundColor: "black", color: "white", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2>Pokémon Table View</h2>
                <input
                    type="text"
                    placeholder="Search Pokémon by name or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        color: "black", // Ensure text is visible on light input background
                        width: "clamp(150px, 30%, 300px)", // Responsive width for search bar
                    }}
                />
            </div>

            {loading ? (
                <p>Loading 300 Pokémon...</p>
            ) : (
                <>
                    {/* Removed Pie Chart Section */}

                    {/* Table Section */}
                    <table
                        border="1"
                        cellPadding="8"
                        cellSpacing="0"
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "left",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: "8px",
                            overflow: "hidden",
                            marginBottom: "1rem",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#333", cursor: "pointer" }}>
                                <th style={{ padding: "12px", borderBottom: "1px solid #555" }}>Serial No.</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #555" }} onClick={() => handleSort("name")}>Name ⬍</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #555" }} onClick={() => handleSort("type")}>Type ⬍</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #555" }} onClick={() => handleSort("height")}>Height ⬍</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #555" }}>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPokemon.map((p, index) => (
                                <tr key={indexOfFirstItem + index} style={{ borderBottom: "1px solid #555", backgroundColor: "black" }}>
                                    <td style={{ padding: "10px" }}>{indexOfFirstItem + index + 1}</td>
                                    <td style={{ padding: "10px" }}>{p.name}</td>
                                    <td style={{ padding: "10px" }}>{p.type}</td>
                                    <td style={{ padding: "10px" }}>{p.height}</td>
                                    <td style={{ padding: "10px" }}>
                                        <button
                                            onClick={() => handleViewDetails(p.url)} // Pass the Pokémon's URL
                                            style={{
                                                backgroundColor: "#007bff",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                transition: "background-color 0.2s ease",
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                                        >View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                        padding: "1rem",
                        backgroundColor: "#222",
                        borderRadius: "8px",
                    }}>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            style={{
                                padding: "8px 15px",
                                margin: "0 5px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                opacity: currentPage === 1 ? 0.6 : 1,
                                transition: "background-color 0.2s ease",
                            }}
                            onMouseOver={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#0056b3'; }}
                            onMouseOut={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#007bff'; }}
                        >
                            Previous
                        </button>

                        {/* Page numbers */}
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                style={{
                                    padding: "8px 12px",
                                    margin: "0 3px",
                                    backgroundColor: currentPage === number ? "#0056b3" : "#444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: currentPage === number ? "bold" : "normal",
                                    transition: "background-color 0.2s ease",
                                }}
                                onMouseOver={(e) => { if (currentPage !== number) e.currentTarget.style.backgroundColor = '#666'; }}
                                onMouseOut={(e) => { if (currentPage !== number) e.currentTarget.style.backgroundColor = currentPage === number ? '#0056b3' : '#444'; }}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: "8px 15px",
                                margin: "0 5px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                opacity: currentPage === totalPages ? 0.6 : 1,
                                transition: "background-color 0.2s ease",
                            }}
                            onMouseOver={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#0056b3'; }}
                            onMouseOut={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#007bff'; }}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* Pokémon Detail Modal */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000, // Ensure modal is on top
                }}>
                    <div style={{
                        backgroundColor: "#333", // Darker background for modal content
                        padding: "2rem",
                        borderRadius: "10px",
                        maxWidth: "90%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        color: "white",
                        position: "relative",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}>
                        <button
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                            }}
                        >
                            &times; {/* Times symbol for close */}
                        </button>

                        {modalLoading ? (
                            <p>Loading Pokémon details...</p>
                        ) : selectedPokemon ? (
                            <div style={{ textAlign: "center" }}>
                                <h3>{selectedPokemon.name.toUpperCase()}</h3>
                                {selectedPokemon.sprite && (
                                    <img
                                        src={selectedPokemon.sprite}
                                        alt={selectedPokemon.name}
                                        style={{ width: "150px", height: "150px", objectFit: "contain", marginBottom: "1rem" }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=No+Image'; }}
                                    />
                                )}
                                <p><strong>Type:</strong> {selectedPokemon.type}</p>
                                <p><strong>Height:</strong> {selectedPokemon.height / 10} m</p> {/* Convert decimetres to meters */}
                                <p><strong>Weight:</strong> {selectedPokemon.weight / 10} kg</p> {/* Convert hectograms to kilograms */}
                                <p><strong>Abilities:</strong> {selectedPokemon.abilities}</p>
                                <div style={{ marginTop: "1rem", textAlign: "left" }}>
                                    <h4>Base Stats:</h4>
                                    {selectedPokemon.stats.map((stat, index) => (
                                        <p key={index} style={{ margin: "0.5rem 0" }}>
                                            <strong>{stat.name.replace('-', ' ')}:</strong> {stat.value}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>Failed to load Pokémon details.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TableView;
