import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div>
                <Link href="/" className="mr-4">
                    Home
                </Link>
                <Link href="/cards" className="mr-4">
                    Cards
                </Link>
                <Link href="/favorites" className="mr-4">
                    My Favorites
                </Link>
            </div>
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-700 p-2 rounded"
            >
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </nav>
    );
}