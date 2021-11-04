import React, { useState, useEffect } from "react";

let poke: Pokemon[] = [];
let favoritCards: Pokemon[] = [];
const Cards = () => {

    const [pokemon, setPokemon] = useState(poke);
    const [favorite, setFavor] = useState(favoritCards);
    useEffect(() => {
        fetch("https://api.pokemontcg.io/v2/cards?q=name:gardevoir", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                poke = (data.data);
                setPokemon(poke)
            }).catch(e => {
                console.error(e);
            });
    }, [])
    function name(pokemon: Pokemon) {
        if (favoritCards.indexOf(pokemon) === -1)
            favoritCards.push(pokemon);
        console.log(favoritCards);
        console.log(favorite);
        setFavor(favorite => ([...favoritCards]));
    }
    return (
        <div>
            <h1 style={{ color: "red" }}>A Simple React Component Example with Typescript </h1>
            {
                pokemon.length !== 0 ?
                    pokemon.map((item, i) => {
                        // Return the element. Also pass key     
                        return (<img height="250" src={item.images.large} onClick={() => { name(item); }} />)
                    }) : <h1> Pleses wait some time.... </h1>
            }
            {/* {pokemon.map((item, index) => (
                <img height="250" src={item ? item.images.large : ""} />
            ))} */}
            < p > 安安.</p>
            < p > 哭R </p>
            {
                favorite.length !== 0 ?
                    favorite.map((item, i) => {
                        // Return the element. Also pass key     
                        return (<img height="100" src={item.images.large} />)
                    }) : <h1> no favorite cards.... </h1>
            }
        </div>
    )
}

export default Cards;

export interface Pokemon {
    id: string;
    name: string;
    supertype: string;
    sutypes: [];
    hp: number;
    types: [];
    evolvesFrom: string;
    abilities: Abilities[];
    attacks: Attacks[];
    weaknesses: Weaknesses[];
    retreatCost: string[];
    set: Sets;
    number: number;
    artist: string;
    rarity: string;
    nationalPokedexNumbers: number[];
    legalities: { unlimited: string };
    images: { small: string; large: string; };
    tcgplayer: TcgPlayer;
    cardmarket: {
        url: string;
        updatedAt: Date;
        prices: {
            averageSellPrice: number;
            lowPrice: number;
            trendPrice: number;
            germanProLow: number;
            suggestedPrice: number;
            reverseHoloSell: number;
            reverseHoloLow: number;
            reverseHoloTrend: number;
            lowPriceExPlus: number;
            avg1: number;
            avg7: number;
            avg30: number;
            reverseHoloAvg1: number;
            reverseHoloAvg7: number;
            reverseHoloAvg30: number;
        };
    };
}
interface Abilities {
    name: string;
    text: string;
    type: string;
}
interface Attacks {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: number;
    text: string;
}
interface Weaknesses {
    type: string;
    value: string;
}
interface Sets {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: { unlimited: string };
    ptcgCode: string;
    releaseData: Date;
    updatedAt: Date;
    images: { symbol: string, logo: string };
}
interface TcgPlayer {
    url: string;
    updatedAt: string;
    price: {
        holofoil: Foil;
        reverseHolofoil: Foil;
    };
}
interface Foil {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
}