import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(''); // Optional: Clear the search input after submission
        }
    };

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <nav className="bg-gray-800 dark:bg-gray-900 p-4 text-white flex justify-between items-center">
            <div>
                <Link href="/">
                    <span className="text-xl font-bold cursor-pointer">Home</span>
                </Link>
            </div>
            <div>
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search cards..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 rounded-l bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-r"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div className="flex items-center">
                <Link href="/cards">
                    <span className="ml-4 cursor-pointer">Cards</span>
                </Link>
                <Link href="/favorites">
                    <span className="ml-4 cursor-pointer">My Favorites</span>
                </Link>
                <button
                    onClick={toggleDarkMode}
                    className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                    {isDarkMode ? (<span className="text-blue-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                        >
                            <path d="M12 2a9.926 9.926 0 00-3.735.733c-.593.22-.659 1.027-.103 1.3A7.993 7.993 0 0116 12a7.993 7.993 0 01-7.838 7.967c-.557.076-.493.886.103 1.3A9.926 9.926 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                        </svg>
                    </span>

                    ) : (
                        <span className="text-yellow-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="24"
                                height="24"
                            >
                                <path d="M12 4a1 1 0 011 1v2a1 1 0 01-2 0V5a1 1 0 011-1zm0 14a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm8.707-6.707a1 1 0 01.707 1.707l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.707.707zm-14.142 0a1 1 0 01.707 1.707l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.707.707zm12.02-7.636a1 1 0 01.35 1.373l-1.67 2.889a1 1 0 01-1.773-.873l1.67-2.889a1 1 0 011.373-.35zm-10.02 0a1 1 0 01.35 1.373l-1.67 2.889a1 1 0 01-1.773-.873l1.67-2.889a1 1 0 011.373-.35zM12 6a6 6 0 100 12 6 6 0 000-12z" />
                            </svg>
                        </span>

                    )}
                </button>
            </div>
        </nav>
    );
}
