import React, { useState, useEffect } from "react";

let poke: Pokemon[] = [];
let favoritCards: Pokemon[] = [];
let totalCount: number;
let currentPage: number;
let totalPage: number;
const Cards = () => {

    const [pokemon, setPokemon] = useState(poke);
    const [favorite, setFavor] = useState(favoritCards);
    const [page, SetPage] = useState(currentPage);
    let imgearray = [];
    useEffect(() => {
        fetch("https://api.pokemontcg.io/v2/cards?page=1", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // totalCount = data.totalCount;
                // currentPage = data.page;
                // totalPage = totalCount / 250;
                // totalPage = Math.round(totalPage);
                // poke.push(...data.data);
                poke = data.data;
                setPokemon(poke);
                // }).finally(() => {
                //     for (let i = 0; i < totalPage; i++) {
                //         fetch("https://api.pokemontcg.io/v2/cards?page=" + `${i + 1}`, { method: "GET" })
                //             .then(res => res.json())
                //             .then(data => {
                //                 console.log(data);
                //             }).finally(() => {
                //             }).catch(e => {
                //                 console.error(e);
                //             });
                //     }
            }).catch(e => {
                console.error(e);
            });
    }, [])

    function ChangePage(num: number) {
        fetch("https://api.pokemontcg.io/v2/cards?page=" + `${num}`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                poke = data.data;
                setPokemon(poke);
                // }).finally(() => {
                //     if (imgearray.length > 0) {
                //         for (let i = 0; i < imgearray.length; i++) {
                //             document.getElementById(i.toString())?.remove();
                //         }
                //         console.log(document);
                //         imgearray = [];
                //     }
            }).catch(e => {
                console.error(e);
            });


    }
    function SetFavorite(pokemon: Pokemon) {
        if (favoritCards.indexOf(pokemon) === -1)
            favoritCards.push(pokemon);
        console.log(favoritCards);
        console.log(favorite);
        setFavor(favorite => ([...favoritCards]));
    }
    function RemoveFavorite(pokemon: Pokemon) {
        favoritCards.splice(favoritCards.indexOf(pokemon), 1);
        console.log(favoritCards);
        console.log(favorite);
        setFavor(favorite => ([...favoritCards]));
    }

    return (
        <div>
            <h1 style={{ color: "red", verticalAlign: "middle" }}>See All these Pokemon</h1>
            {
                pokemon.length !== 0 ?
                    pokemon.map((item, i) => {
                        // Return the element. Also pass key     
                        // const j = <img id={`${i}`} height="150" src={item.images.large} onClick={() => { SetFavorite(item); }} />;
                        // imgearray.push(j);
                        return (<img height="150" src={item.images.large} onClick={() => { SetFavorite(item); }} />)
                    }) : <h1> Pleses wait some time.... </h1>
            }
            {/* {pokemon.map((item, index) => (
                <img height="250" src={item ? item.images.large : ""} />
            ))} */}
            < p > 安安.</p>
            <button onClick={() => ChangePage(2)} />
            < h2 > Favorite Cards </h2>
            <p>(Click to Remove)</p>
            {
                favorite.length !== 0 ?
                    favorite.map((item, i) => {
                        // Return the element. Also pass key
                        // const j = <img id={`${i}`} height="150" src={item.images.large} onClick={() => { SetFavorite(item); }} />;
                        // imgearray.push(j);
                        return (<img height="150" src={item.images.large} onClick={() => { RemoveFavorite(item); }} />)
                    }) : <p> no favorite cards.... </p>
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