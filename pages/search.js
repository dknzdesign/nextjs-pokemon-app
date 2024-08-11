import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";
import Card from '../components/Card'; // Import the Card component
export default function CardsPage() {
    const router = useRouter();
    const { query: urlQuery } = router.query; // Get query parameter from the URL
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(urlQuery || ''); // Initialize with URL query or empty string
    const [favorites, setFavorites] = useState(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        }
        return [];
    });
    const toggleFavorite = (card) => {
        let updatedFavorites = [];
        if (favorites.some((fav) => fav.id === card.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== card.id);
        } else {
            updatedFavorites = [...favorites, card];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    useEffect(() => {
        const fetchCards = async () => {
            if (searchQuery.trim() === '') {
                setCards([]);
                return;
            }
            setLoading(true);
            const response = await fetch(
                `https://api.pokemontcg.io/v2/cards?q=name:${searchQuery}&page=${page}&pageSize=20`
            );
            const data = await response.json();
            setCards(data.data); // The results are in `data.data`
            setLoading(false);
        };
        fetchCards();
    }, [searchQuery, page]); // Update whenever searchQuery or page changes

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        router.push(`/search?query=${e.target.value}`, undefined, { shallow: true }); // Update the URL query parameter
    };

    const handleNextPage = () => setPage(prev => prev + 1);
    const handlePrevPage = () => setPage(prev => prev - 1);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 text-slate-700 dark:text-slate-100">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search cards by name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>

                {cards.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cards.map(card => (

                                <Card
                                    key={card.id}
                                    card={card}
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite} /> // Use the Card component here

                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button onClick={handlePrevPage} disabled={page === 1} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
                                Previous
                            </button>
                            <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded">
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4">
                        {loading ? <p>Loading...</p> : <p>No results found</p>}
                    </div>
                )}
            </div>
        </>
    );
}
