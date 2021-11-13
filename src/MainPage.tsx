import React, { useState, useEffect } from "react";
// import materialui, { Stack, Pagination, ImageList, ImageListItem, Dialog, DialogTitle, DialogActions, DialogContent, OutlinedInput, Box, Button, Container, createStyles, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Icon, InputLabel, makeStyles, MenuItem, Select, Switch, TextField, Theme, RadioGroup, Radio, Checkbox } from "@material-ui/core";
import materialui, { Pagination, ImageList, Dialog, Button, FormControl, FormLabel, Grid, InputLabel, Select } from "@material-ui/core";
import SearchUI from "./SearchUI";
import CardInfoUI from "./CardInfoUI";

let poke: Struct.Pokemon[] = [];
let favoritCards: Struct.Pokemon[] = [];
let totalCount: number = 0;
let page: number = 1;
let totalPage: number = 0;
let showcount: number = 20;
let OnSelectPokemon: Struct.Pokemon;
let loading: boolean = false;
let optionStr = "";
let isFavor: boolean = false;
const OrignApi: string = `https://api.pokemontcg.io/v2/cards?pageSize=20&page=1`

const MainPage = () => {
    const [pokemon, setPokemon] = useState(poke);
    const [favorite, setFavor] = useState(favoritCards);
    const [open, setOpen] = useState(false);
    const [openinfo, setOpenCardinfo] = useState(false);
    const [waitStr, SetWaitingStr] = useState("Loading, Pleses wait some time....");
    const [FavorStr, SetFavorStr] = useState("Set Favorite");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageArray, setPageArray] = useState([0]);
    const [selectPage, setSelectPage] = useState(1);

    let apiurl: string = `https://api.pokemontcg.io/v2/cards?pageSize=${showcount}&page=${page}`;

    function OnFetch(data: any) {
        SetWaitingStr("Loading, Pleses wait some time....");
        console.log(data);
        totalCount = data.totalCount;
        setCurrentPage(data.page);
        totalPage = Math.ceil(totalCount / showcount);
        poke = data.data;
        loading = false;
        setPokemon(pokemon => ([...poke]));
        let arr: number[] = [];
        for (let i = 0; i < totalPage; i++) {
            arr.push(i + 1);
        }
        setPageArray(pageArray => ([...arr]));
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
        apiurl = `https://api.pokemontcg.io/v2/cards?pageSize=${showcount}&page=${page}${optionStr}`;
        console.log("Search Api : ", apiurl);
    }
    function setSeatchStr(str: string) {
        optionStr = str;
    }
    function ChangePage(num: number) {
        SetWaitingStr("Loading, Pleses wait some time....");
        setCurrentPage(num);
        page = num;
        console.log(optionStr);
        setApi();
        setPokemon([]);
        loading = true;
        setSelectPage(selectPage => num);
        fetch(apiurl, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                OnFetch(data);
            }).catch(e => {
                console.error(e);
            });
    }
    function SetFavorite(pokemon: Struct.Pokemon) {
        if (favoritCards.indexOf(pokemon) === -1)
            favoritCards.push(pokemon);
        setFavor(favorite => ([...favoritCards]));
    }
    function RemoveFavorite(pokemon: Struct.Pokemon) {
        favoritCards.splice(favoritCards.indexOf(pokemon), 1);
        setFavor(favorite => ([...favoritCards]));
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        ChangePage(value);
    }
    function OpenCardinfo(pokemon: Struct.Pokemon, isFavorite: boolean) {
        // console.log(sortoption);
        OnSelectPokemon = pokemon;
        isFavor = isFavorite;
        isFavorite ? SetFavorStr("Remove Favorite") : SetFavorStr("Set Favorite");
        setOpenCardinfo(true);
    }
    function CloseCardinfo() {
        setOpenCardinfo(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <div style={{ backgroundColor: '#064b88', }}>
            <Grid alignItems="center" justifyContent="center" container >
                <h1 style={{ color: "white", verticalAlign: "middle" }}>Pokemon TCG Card</h1>
            </Grid>
            {/** Select Search Options */}
            <Grid alignItems="center" justifyContent="center" container  >
                <Button variant="contained" onClick={handleClickOpen}>Open Search Options</Button>
            </Grid>
            <Grid direction="row" alignItems="center" justifyContent="center" container >
                <ImageList sx={{ height: 600, width: 800 }} cols={5} gap={10}
                    style={{
                        backgroundColor: '#172742',
                    }}>
                    {
                        pokemon.length !== 0 ? pokemon.map((item, i) => {
                            {
                                return (
                                    item.images ? <img key={item.id} height="200" src={item.images.large} onClick={() => {
                                        OpenCardinfo(item, false);
                                    }} alt="description" /> :
                                        <FormLabel style={{ color: "orchid" }}> Load Image Failed </FormLabel>
                                )
                            }
                        }) : <FormLabel style={{ color: "white" }}> {waitStr} </FormLabel >
                    }
                </ImageList >
            </Grid>
            <Grid direction="row" alignItems="center" justifyContent="center" container>
                <Grid item>
                    <Pagination count={totalPage} color="secondary" onChange={handleChange} page={currentPage} disabled={loading} />
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel>Jump to</InputLabel>
                        <Select
                            native
                            value={selectPage.toString()}
                            onChange={((event: materialui.SelectChangeEvent<string>, child: React.ReactNode) => { ChangePage(Number(event.target.value)); })}
                            label={"Jump to"}
                        >
                            {
                                pageArray.map((num, arr) => {
                                    {
                                        return (
                                            <option key={num} value={num}>{num}</option>
                                        )
                                    }
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid alignItems="center" justifyContent="center" container color="pink">
                < h2 > Favorite Cards </h2>
            </Grid>
            <Grid alignItems="center" justifyContent="center" container >
                <p>(Click to Check or Remove)</p>
            </Grid>
            <Grid direction="row" alignItems="center" justifyContent="center" container >
                <ImageList sx={{ height: 200, width: 650 }} cols={5} gap={5} style={{ backgroundColor: '#172742', }}>
                    {
                        favorite.length !== 0 ? favorite.map((item, i) => {
                            return (
                                item.images ?
                                    <img style={{ alignSelf: 'center' }} key={item.id} height="150" src={item.images.large} onClick={() => {
                                        OpenCardinfo(item, true);
                                    }} alt="description" /> : <FormLabel style={{ color: "orchid" }}> Load Image Failed </FormLabel>
                            )
                        }) : <FormLabel style={{ color: "white" }}> no favorite cards....</FormLabel>
                    }
                </ImageList>
            </Grid>
            {/** Search UI */}
            <Dialog fullWidth={true} disableEscapeKeyDown open={openinfo} onClose={() => { CloseCardinfo(); }}>
                <CardInfoUI OnSelectPokemon={OnSelectPokemon} isFavor={isFavor} CloseCardinfo={CloseCardinfo} RemoveFavorite={RemoveFavorite} SetFavorite={SetFavorite} FavorStr={FavorStr} />
            </Dialog>
            {/** Select Card Info */}
            <Dialog disableEscapeKeyDown open={open} fullWidth={true} >{/*onClose={() => { (setOpen(false)) }}*/}
                <SearchUI onSetSearch_OptionStr={setSeatchStr} onOpen={setOpen} onChangePage={ChangePage}></SearchUI>
            </Dialog>
        </div >
    )
}

export default MainPage;

