import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Card from '../components/Card'; // Import the Card component

const Favorites = () => {
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
        if (typeof window !== "undefined") {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
            if (storedFavorites) {
                setFavorites(storedFavorites);
            }
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-8  text-slate-700 dark:text-slate-100">
                <h1 className="text-4xl font-bold">My Favorite Cards</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {favorites.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite} /> // Use the Card component here
                    ))}
                </div>
            </div>
        </>
    );
};

export default Favorites;