import Link from 'next/link';

export default function Card({ card, favorites, toggleFavorite }) {
    return (
        <div key={card.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
        >
            <Link href={`/cards/${card.id}`}> <img loading="lazy"
                src={card.images.small}
                alt={card.name}
                className="lazyload w-full h-auto w-100 object-contain"
            /></Link>
            <h3 className=" text-center text-xl font-bold mt-4">{card.name}</h3>
            <p className="mt-2 ext-center">HP: {card.hp}</p>
            <p className="flex justify-between items-center">
                <Link href={`/cards/${card.id}`}>
                    <span className="text-center text-blue-400 mt-2 inline-block">View</span>
                </Link>
                <button
                    onClick={() => toggleFavorite(card)}
                    className={`mt-4 ${favorites.some((fav) => fav.id === card.id)
                        ? "text-red-500"
                        : "text-gray-400"
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>

                </button>
            </p>

        </div>
    )
}
