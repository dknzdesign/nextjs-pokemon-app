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
                    <h1 className="flex justify-between text-4xl font-bold">
                        <span className="block">{card.name}</span>
                        <span className="block max-w-8">
                            <img src={card.set.images.symbol} alt="Series Symbol" /></span>
                    </h1>
                    <p className="mt-2">{card.flavorText}</p>
                    <p className="mt-2"><b>Artist: </b>{card.artist}</p>
                    <h2 className="my-2 border-b text-lg font-semibold flex">Prices</h2>
                    {card.tcgplayer.prices?.holofoil && (<p className="mt-2"><b>Holofoil: </b>${card.tcgplayer.prices?.holofoil.market.toFixed(2)}USD</p>)}
                    {card.tcgplayer.prices?.reverseHolofoil && (<p className="mt-2"><b>Reverse Holofoil: </b>${card.tcgplayer.prices?.reverseHolofoil?.market.toFixed(2)}USD</p>)}
                    <h2 className="my-2 border-b text-lg font-semibold flex">Details</h2>
                    <p className="mt-4"><b>HP: </b> {card.hp}</p>
                    <p className="mt-2"><b>Type: </b> {card.types.join(", ")}</p>

                    {card.weaknesses && (<p className="mt-2"><b>Weakness: </b>{card.weaknesses.map(el => el.type + ' ' + el.value)}</p>)}
                    {card.resistances && (<p className="mt-2"><b>Resistances: </b>{card.resistances.map(el => el.type + ' ' + el.value)}</p>)}
                    <h2 className="my-2  border-b text-lg font-semibold flex">
                        <span>Series - {card.set.series}</span>
                    </h2>
                    <p className="mt-2"><b>Released:</b> {card.set.releaseDate}</p>
                    <p className="mt-2"><b>Printed: </b>{card.set.printedTotal}</p>
                    <p className="mt-2"><b>Rarity: </b>{card.rarity}</p>


                    <Link href="/cards">
                        <span className="mt-8 inline-block bg-gray-700 text-white p-2 rounded">
                            Back
                        </span>
                    </Link>
                </div>
            </div>
            {/* <div>{JSON.stringify(card)}</div> */}
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