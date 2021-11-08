import React, { useState, useEffect } from "react";
import materialui, { Stack, Pagination, ImageList, ImageListItem, Dialog, DialogTitle, DialogActions, DialogContent, OutlinedInput, Box, Button, Container, createStyles, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Icon, InputLabel, makeStyles, MenuItem, Select, Switch, TextField, Theme } from "@material-ui/core";

let poke: Pokemon[] = [];
let favoritCards: Pokemon[] = [];
let totalCount: number = 0;
let currentPage: number = 1;
let totalPage: number = 0;
let showcount: number = 20;
let OnSelectPokemon: Pokemon;
let loading: boolean = false;

const Cards = () => {
    let apiurl: string = `https://api.pokemontcg.io/v2/cards?pageSize=${showcount}&page=${currentPage}`;
    const [pokemon, setPokemon] = useState(poke);
    const [favorite, setFavor] = useState(favoritCards);
    const [open, setOpen] = useState(false);
    const [openinfo, setOpenCardinfo] = useState(false);

    useEffect(() => {
        loading = true;
        fetch(apiurl, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                totalCount = data.totalCount;
                currentPage = data.page;
                totalPage = totalCount / showcount;
                totalPage = Math.round(totalPage);
                poke = data.data;
                loading = false;
                setPokemon(pokemon => ([...poke]));
            }).catch(e => {
                console.error(e);
            });
    }, [])
    function setApi() {
        apiurl = `https://api.pokemontcg.io/v2/cards?pageSize=${showcount}&page=${currentPage}`;
    }
    function ChangePage(num: number) {
        // if ((currentPage === 1 && num === -1) || (currentPage === totalPage && num === 1))
        //     return;
        currentPage = num;
        setApi();
        console.log(apiurl);
        setPokemon([]);
        loading = true;
        fetch(apiurl, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                poke = data.data;
                loading = false;
                setPokemon(pokemon => ([...poke]));
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
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        ChangePage(value);
    };
    const onSearchChange = (event: materialui.SelectChangeEvent<any>) => {
        // setAge(Number(event.target.value) || "");
    };
    function OpenCardinfo(pokemon: Pokemon) {
        OnSelectPokemon = pokemon;
        setOpenCardinfo(true);
    }
    function CloseCardinfo(event: any, reason: string) {
        // OnSelectPokemon = ;
        if (reason === "Ok") {
        }

        setOpenCardinfo(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event: any, reason: string) => {
        if (reason === "Ok") {
            console.log("Ok");
        } else {

        }
        // if (reason !== "backdropClick") {
        // }
        setOpen(false);
    };
    return (
        <div>
            <Grid alignItems="center" justifyContent="center" container >
                <h1 style={{ color: "red", verticalAlign: "middle" }}>See All these Pokemon</h1>
            </Grid>
            {/** Select Search Options */}
            <Grid alignItems="center" justifyContent="center" container  >
                <Button onClick={handleClickOpen}>Open Search Options</Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>Options</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                                <Select
                                    native
                                    value={0}
                                    onChange={onSearchChange}
                                    input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={0}
                                    onChange={onSearchChange}
                                    input={<OutlinedInput label="Age" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Grid alignItems="center" justifyContent="center" container spacing={5}>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => handleClose("", "Cancel")}>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={() => handleClose("", "Ok")}>Ok</Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </Grid>
            {/** Select Card Info */}
            {/* <Grid alignItems="center" justifyContent="center" container > */}
            <Dialog fullWidth={true} maxWidth={"xl"} disableEscapeKeyDown open={openinfo} onClose={CloseCardinfo}>
                <Grid alignItems="center" justifyContent="center" container >
                    <DialogTitle>
                        {OnSelectPokemon ? OnSelectPokemon.name : ""}
                    </DialogTitle>
                </Grid>
                <DialogContent>
                    <Grid alignItems="center" justifyContent="center" container >
                        {
                            OnSelectPokemon ?
                                <img
                                    src={OnSelectPokemon.images.large}
                                /> : ""
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid alignItems="center" justifyContent="center" container spacing={5}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => CloseCardinfo("", "Close")}>Close</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={() => SetFavorite(OnSelectPokemon)}>SetFavorite</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
            <Grid direction="row" alignItems="center" justifyContent="center" container >
                <ImageList sx={{ height: 600, width: 800 }} cols={5} gap={10}>
                    {
                        pokemon.length !== 0 ?
                            pokemon.map((item, i) => {
                                // Return the element. Also pass key
                                {
                                    return (
                                        <img height="200" src={item.images.large} onClick={() => {
                                            OpenCardinfo(item);
                                        }} />
                                    )
                                }
                            }) : <FormLabel filled={true}> Pleses wait some time.... </FormLabel >
                    }
                </ImageList >
            </Grid>
            <Grid direction="row" alignItems="center" justifyContent="center" container>
                <Stack spacing={currentPage}>
                    <Pagination count={totalPage} color="secondary" onChange={handleChange} disabled={loading} />
                </Stack>
            </Grid>
            <Grid alignItems="center" justifyContent="center" container >
                < h2 > Favorite Cards </h2>
            </Grid>
            <Grid direction="row" alignItems="center" justifyContent="center" container >
                <ImageList sx={{ height: 200, width: 650 }} cols={5} gap={5}>
                    {
                        favorite.length !== 0 ? (
                            favorite.map((item, i) => {
                                return (<img height="150" src={item.images.large} onClick={() => {
                                    RemoveFavorite(item);
                                }}
                                />)
                            })) : <FormLabel > no favorite cards....</FormLabel>
                    }
                </ImageList><p>(Click to Remove)</p>
            </Grid>
        </div >
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
    releaseDate: Date;
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
// {"https://api.pokemontcg.io/v2/types"
//     "data": [
//       "Colorless",
//       "Darkness",
//       "Dragon",
//       "Fairy",
//       "Fighting",
//       "Fire",
//       "Grass",
//       "Lightning",
//       "Metal",
//       "Psychic",
//       "Water"
//     ]
//   }
// {https://api.pokemontcg.io/v2/supertypes
//     "data": [
//       "Energy",
//       "Pokémon",
//       "Trainer"
//     ]
//   }
// {"https://api.pokemontcg.io/v2/rarities"
//     "data": [
//         "Amazing",
//         "Common",
//         "LEGEND",
//         "Promo",
//         "Rare",
//         "ACE",
//         "BREAK",
//         "Holo",
//         "Holo EX",
//         "Holo GX",
//         "Holo LV.X",
//         "Holo Star",
//         "Holo V",
//         "Holo VMAX",
//         "Prime",
//         "Prism Star",
//         "Rainbow",
//         "Secret",
//         "Shining",
//         "Shiny",
//         "Shiny GX",
//         "Ultra",
//         "Uncommon"
//     ]
//   }
//https://pjchender.dev/react/note-react-with-ts/#children-as-props
// # Get all cards
// curl "https://api.pokemontcg.io/v2/cards"

// # Get a single page of cards
// curl "https://api.pokemontcg.io/v2/cards?page=1&pageSize=250"

// # Filter cards via query parameters
// curl "https://api.pokemontcg.io/v2/cards?q=set.name:generations subtypes:mega"

// # Order by release date (descending)
// curl "https://api.pokemontcg.io/v2/cards?q=subtypes:mega&orderBy=-set.releaseDate"


//https://api.pokemontcg.io/v2/cards?pageSize=10&q=types:water     //type
//https://api.pokemontcg.io/v2/cards?pageSize=10&q=name:Azumarill  //name

//nationalPokedexNumbers:[1 TO 151] number
//npm install @material-ui/core@next @emotion/react @emotion/styled
//hp:[* TO 100]
//hp:[150 TO *]


