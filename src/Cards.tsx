import React, { useState, useEffect } from "react";
import materialui, { Stack, Pagination, ImageList, ImageListItem, Dialog, DialogTitle, DialogActions, DialogContent, OutlinedInput, Box, Button, Container, createStyles, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Icon, InputLabel, makeStyles, MenuItem, Select, Switch, TextField, Theme } from "@material-ui/core";
import { stringify } from "querystring";

let poke: Pokemon[] = [];
let favoritCards: Pokemon[] = [];
let totalCount: number = 0;
let currentPage: number = 1;
let totalPage: number = 0;
let showcount: number = 20;
let OnSelectPokemon: Pokemon;
let loading: boolean = false;
let optionStr = "";
let isFavor: boolean = false;

const Cards = () => {
    let apiurl: string = `https://api.pokemontcg.io/v2/cards?pageSize=${showcount}&page=${currentPage}`;
    const OrignApi: string = `https://api.pokemontcg.io/v2/cards?pageSize=20&page=1`
    const [pokemon, setPokemon] = useState(poke);
    const [favorite, setFavor] = useState(favoritCards);
    const [open, setOpen] = useState(false);
    const [openinfo, setOpenCardinfo] = useState(false);
    const [types, SetTypes] = useState("Default");
    const [rarities, SetRarities] = useState("Default");
    const [name, SetName] = useState("Default");
    const [Max, SetMax] = useState("*");
    const [Min, SetMin] = useState("*");
    const [waitStr, SetWaitingStr] = useState("Loading, Pleses wait some time....");
    const [FavorStr, SetFavorStr] = useState("Set Favorite");

    function OnFetch(data: any) {
        SetWaitingStr("Loading, Pleses wait some time....");
        console.log(data);
        totalCount = data.totalCount;
        currentPage = data.page;
        totalPage = Math.ceil(totalCount / showcount);
        poke = data.data;
        loading = false;
        setPokemon(pokemon => ([...poke]));
        if (poke.length === 0) {
            SetWaitingStr("No Result");
        }
    }
    useEffect(() => {
        loading = true;
        fetch(OrignApi, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                OnFetch(data);
                setPokemon(pokemon => ([...poke]));
            }).catch(e => {
                console.error(e);
            });
    }, [])

    function setApi() {
        apiurl = `https://api.pokemontcg.io/v2/cards?pageSize=${showcount}&page=${currentPage}${optionStr}`;
        console.log(apiurl, showcount, currentPage, optionStr);
    }

    function ChangePage(num: number) {
        // if ((currentPage === 1 && num === -1) || (currentPage === totalPage && num === 1))
        //     return;
        currentPage = num;
        setApi();
        setPokemon([]);
        loading = true;
        fetch(apiurl, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                OnFetch(data);
            }).catch(e => {
                console.error(e);
            });
    }
    function SetFavorite(pokemon: Pokemon) {
        if (favoritCards.indexOf(pokemon) === -1)
            favoritCards.push(pokemon);
        setFavor(favorite => ([...favoritCards]));
    }
    function RemoveFavorite(pokemon: Pokemon) {
        favoritCards.splice(favoritCards.indexOf(pokemon), 1);
        setFavor(favorite => ([...favoritCards]));
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        ChangePage(value);
    };
    const onTypeChange = (event: materialui.SelectChangeEvent<string>) => {
        SetTypes(event.target.value);
    };
    const onRaritiesChange = (event: materialui.SelectChangeEvent<string>) => {
        SetRarities(event.target.value);
        // setAge(Number(event.target.value) || "");
    };
    const onNameChange = (event: any) => {
        SetName(event.target.value);
    }
    const onHPMinChange = (event: any) => {
        SetMin(event.target.value);
    }
    const onHPMaxChange = (event: any) => {
        SetMax(event.target.value);
    }
    function OpenCardinfo(pokemon: Pokemon, isFavorite: boolean) {
        OnSelectPokemon = pokemon;
        isFavor = isFavorite;
        isFavorite ? SetFavorStr("Remove Favorite") : SetFavorStr("Set Favorite");
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
        let addstr = "";
        if (reason === "Ok") {
            console.log("Ok");
            if (types !== ("Default" || "")) {
                addstr += `types:${types} `
            }
            if (rarities !== ("Default" || "")) {
                addstr += `rarity:${rarities} `
            }
            if (name !== ("Default" || "")) {
                addstr += `name:*${name}* `;
            }
            if (Min === ("*") && Max === ("*")) {

            }
            else {
                if (Min !== ("") && Max !== ("")) {
                    if (Number(Min) && Number(Max)) {
                        addstr += `hp:[${Min} to ${Max}] `
                    } else {
                        if (Number(Min)) {
                            addstr += `hp:[${Min} to *] `
                        }
                        if (Number(Max)) {
                            addstr += `hp:[* to ${Max}] `
                        }
                    }
                }
            }
            if (addstr !== "") {
                optionStr = `&q=${addstr}`;
            } else {
                optionStr = "";
            }
            // optionStr = `&sets&q=set.releaseDate:2009/02/11`;
            // console.log(Date.parse("2009/02/11"));
            ChangePage(1);
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
                <Button variant="contained" onClick={handleClickOpen}>Open Search Options</Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>Search Options</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel htmlFor="demo-dialog-native">Types(屬性)</InputLabel>
                                <Select
                                    native
                                    value={types}
                                    onChange={onTypeChange}
                                    input={<OutlinedInput label="Types(屬性)" id="demo-dialog-native" />}
                                >
                                    <option value={"Default"}>Default</option>
                                    <option value={"Colorless"}>Colorless</option>
                                    <option value={"Darkness"}>Darkness</option>
                                    <option value={"Dragon"}>Dragon</option>
                                    <option value={"Fairy"}>Fairy</option>
                                    <option value={"Fighting"}>Fighting</option>
                                    <option value={"Fire"}>Fire</option>
                                    <option value={"Grass"}>Grass</option>
                                    <option value={"Lightning"}>Lightning</option>
                                    <option value={"Metal"}>Metal</option>
                                    <option value={"Psychic"}>Psychic</option>
                                    <option value={"Water"}>Water</option>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-dialog-select-label">Rarities(稀有度)</InputLabel>
                                <Select
                                    native
                                    value={rarities}
                                    onChange={onRaritiesChange}
                                    input={<OutlinedInput label="Rarities(稀有度)" id="demo-dialog-native" />}
                                >
                                    <option value={"Default"}>Default</option>
                                    <option value={"Amazing"}>Amazing</option>
                                    <option value={"Common"}>Common</option>
                                    <option value={"Legend"}>Legend</option>
                                    <option value={"Promo"}>Promo</option>
                                    <option value={"Rare"}>Rare</option>
                                    <option value={"\"Rare ACE\""}>Rare ACE</option>
                                    <option value={"\"Rare BREAK\""}>Rare BREAK</option>
                                    <option value={"\"Rare Holo\""}>Rare Holo</option>
                                    <option value={"\"Rare Holo EX\""}>Rare Holo EX</option>
                                    <option value={"\"Rare Holo GX\""}>Rare Holo GX</option>
                                    <option value={"\"Rare Holo LV.X\""}>Rare Holo LV.X</option>
                                    <option value={"\"Rare Holo Star\""}>Rare Holo Star</option>
                                    <option value={"\"Rare Holo V\""}>Rare Holo V</option>
                                    <option value={"\"Rare Holo VMAX\""}>Rare Holo VMAX</option>
                                    <option value={"\"Rare Prime\""}>Rare Prime</option>
                                    <option value={"\"Rare Prism Star\""}>Rare Prism Star</option>
                                    <option value={"\"Rare Rainbow\""}>Rare Rainbow</option>
                                    <option value={"\"Rare Secret\""}>Rare Secret</option>
                                    <option value={"\"Rare Shining\""}>Rare Shining</option>
                                    <option value={"\"Rare Shiny\""}>Rare Shiny</option>
                                    <option value={"\"Rare Shiny GX\""}>Rare Shiny GX</option>
                                    <option value={"\"Rare Ultra\""}>Rare Ultra</option>
                                    <option value={"Uncommon"}>Uncommon</option>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 200 }}>
                                <TextField id="outlined-search" label="Name" type="search" defaultValue={name} onChange={onNameChange} />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 50, maxWidth: 150 }}>
                                <TextField id="outlined-search" label="HP Min" type="search" defaultValue={Min} onChange={onHPMinChange} />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 10 }}>
                                <FormLabel > to</FormLabel>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 50, maxWidth: 150 }}>
                                <TextField id="outlined-search" label="Hp Max" type="search" defaultValue={Max} onChange={onHPMaxChange} />
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
                            <Button variant="contained" color="secondary" onClick={() => { isFavor ? RemoveFavorite(OnSelectPokemon) : SetFavorite(OnSelectPokemon) }}>{FavorStr}</Button>
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
                                            OpenCardinfo(item, false);
                                        }} />
                                    )
                                }
                            }) : <FormLabel filled={true}> {waitStr} </FormLabel >
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
                                    OpenCardinfo(item, true);
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
    level: number;
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


