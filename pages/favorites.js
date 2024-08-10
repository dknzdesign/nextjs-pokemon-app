import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

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
            <div className="p-8">
                <h1 className="text-4xl font-bold">My Favorite Cards</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {favorites.map((card) => (
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Favorites;