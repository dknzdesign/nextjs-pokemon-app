
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold">Welcome to Pokémon Cards</h1>
        <p className="mt-4">
          Browse your favorite Pokémon cards, add them to your favorites, and
          explore more!
        </p>
      </div>
    </>
  );
}