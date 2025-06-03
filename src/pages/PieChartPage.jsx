import { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function PieChartPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllPokemon() {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
                const data = await res.json();

                const detailedPromises = data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    const details = await res.json();

                    return details.types.map(t => t.type.name); // return array of types
                });

                const typeArrays = await Promise.all(detailedPromises);
                const allTypes = typeArrays.flat(); // flatten into a single list

                // Count type frequencies
                const typeCount = {};
                allTypes.forEach(type => {
                    typeCount[type] = (typeCount[type] || 0) + 1;
                });

                const chartData = Object.keys(typeCount).map(type => ({
                    name: type,
                    value: typeCount[type],
                }));

                setPokemonList(chartData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching Pokémon types", err);
            }
        }

        fetchAllPokemon();
    }, []);

    // Colors for each type (you can customize)
    const COLORS = [
        "#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#2ECC71",
        "#E67E22", "#1ABC9C", "#C0392B", "#F1C40F", "#7F8C8D",
        "#3498DB", "#D35400", "#9B59B6", "#E74C3C", "#34495E",
    ];

    return (
        <div style={{ padding: "2rem", backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
            <h2>Pokémon Type Distribution (300 Pokémon)</h2>

            {loading ? (
                <p>Loading type data...</p>
            ) : (
                <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                        <Pie
                            data={pokemonList}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={180}
                            label
                        >
                            {pokemonList.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default PieChartPage;
