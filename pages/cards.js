import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from 'next/link';

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        }
        return [];
    });

    useEffect(() => {
        const fetchCards = async () => {
            const res = await fetch(
                `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=20`
            );
            const data = await res.json();
            setCards(data.data);
        };
        fetchCards();
    }, [page]);

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

    return (
        <>
            <Navbar />
            <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
                        >
                            <img
                                src={card.images.small}
                                alt={card.name}
                                className="lazyload w-full h-40 object-contain"
                            />
                            <h3 className="text-xl font-bold mt-4">{card.name}</h3>
                            <p className="mt-2">Points: {card.hp}</p>
                            <Link href={`/cards/${card.id}`}>
                                <span className="text-blue-500 mt-2 inline-block">View Details</span>
                            </Link>
                            <button
                                onClick={() => toggleFavorite(card)}
                                className={`mt-4 ${favorites.some((fav) => fav.id === card.id)
                                    ? "text-red-500"
                                    : "text-gray-400"
                                    }`}
                            >
                                ♥
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="bg-gray-700 text-white p-2 rounded"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="bg-gray-700 text-white p-2 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cards;