import Navbar from "@/components/Navbar";
import Link from "next/link";

const CardDetails = ({ card }) => {
    return (
        <>
            <Navbar />
            <div className="p-8 flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img src={card.images.large} alt={card.name} className="w-full" />
                </div>
                <div className="md:w-1/2 md:pl-8">
                    <h1 className="text-4xl font-bold">{card.name}</h1>
                    <p className="mt-4">HP: {card.hp}</p>
                    <p className="mt-2">Type: {card.types.join(", ")}</p>
                    <p className="mt-2">Rarity: {card.rarity}</p>
                    <Link href="/cards">
                        <span className="mt-8 inline-block bg-gray-700 text-white p-2 rounded">
                            Back
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const res = await fetch("https://api.pokemontcg.io/v2/cards?pageSize=20");
    const data = await res.json();

    const paths = data.data.map((card) => ({
        params: { id: card.id },
    }));

    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards/${params.id}`);
    const card = await res.json();

    return { props: { card: card.data } };
}

export default CardDetails;