import materialui, { DialogTitle, DialogActions, DialogContent, OutlinedInput, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Select, Switch, TextField, RadioGroup, Radio } from "@material-ui/core";
import React, { useEffect, useState } from "react";

let optionStr = "";
const Rarity: string[] = [
    "Default",
    "Amazing",
    "Common",
    "Legend",
    "Promo",
    "Rare",
    "\"Rare ACE\"",
    "\"Rare BREAK\"",
    "\"Rare Holo\"",
    "\"Rare Holo EX\"",
    "\"Rare Holo GX\"",
    "\"Rare Holo LV.X\"",
    "\"Rare Holo Star\"",
    "\"Rare Holo V\"",
    "\"Rare Holo VMAX\"",
    "\"Rare Prime\"",
    "\"Rare Prism Star\"",
    "\"Rare Rainbow\"",
    "\"Rare Secret\"",
    "\"Rare Shining\"",
    "\"Rare Shiny\"",
    "\"Rare Shiny GX\"",
    "\"Rare Ultra\"",
    "Uncommon",
];
const Type: string[] = [
    "Default",
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water",
];
type Props = {
    onOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSetSearch_OptionStr: (str: string) => void;
    onChangePage: (num: number) => void;
}

const SearchUI: React.FC<Props> = (props) => {
    const [types, SetTypes] = useState("Default");
    const [rarities, SetRarities] = useState("Default");
    const [name, SetName] = useState("Default");
    const [Max, SetMax] = useState("*");
    const [Min, SetMin] = useState("*");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [sortoption, setSort] = useState("Default");
    const [reverse, setReverse] = useState(true);

    useEffect(() => {
        const types = localStorage.getItem("types");
        if (types) {
            SetTypes(types);
        }
        const rarities = localStorage.getItem("rarities");
        if (rarities) {
            SetRarities(rarities);
        }
        const name = localStorage.getItem("name");
        if (name) {
            SetName(name);
        }
        const Max = localStorage.getItem("Max");
        if (Max) {
            SetMax(Max);
        }
        const Min = localStorage.getItem("Min");
        if (Min) {
            SetMin(Min);
        }
        const year = localStorage.getItem("year");
        if (year) {
            setYear(Number(year));
        }
        const month = localStorage.getItem("month");
        if (month) {
            setMonth(Number(month));
        }
        const day = localStorage.getItem("day");
        if (day) {
            setDay(Number(day));
        }
        const reverse = localStorage.getItem("reverse");
        if (reverse) {
            setReverse(reverse === "true" ? true : false);
        }
        const sortoption = localStorage.getItem("sortoption");
        if (sortoption) {
            setSort(sortoption);
        }
    }, [])

    const handleClose = (event: any, reason: string) => {
        let addstr = "";
        if (reason === "Ok") {
            // console.log("Ok");
            if (types !== ("Default" || "")) {
                addstr += `types:${types} `;
            }
            if (rarities !== ("Default" || "")) {
                addstr += `rarity:${rarities} `;
            }
            if (name !== ("Default" || "")) {
                addstr += `name:${name}* `;
            }
            if (Min === ("*") && Max === ("*")) {

            }
            else {
                if (Min !== ("") && Max !== ("")) {
                    if (Number(Min) && Number(Max)) {
                        addstr += `hp:[${Min} to ${Max}] `;
                    } else {
                        if (Number(Min)) {
                            addstr += `hp:[${Min} to *] `;
                        }
                        if (Number(Max)) {
                            addstr += `hp:[* to ${Max}] `;
                        }
                    }
                }
            }
            if (year > 1000) {
                if (month > 0 && month < 13) {
                    if (day > 0 && day < 31) {
                        addstr += `set.releaseDate:"${year}/${String("0" + month).slice(-2)}/${String("0" + day).slice(-2)}"`;
                    }
                }
            }
            if (addstr !== "") {
                optionStr = `&q=${addstr}`;
            } else {
                optionStr = "";
            }
            if (sortoption !== "Default") {
                optionStr += reverse ? `&orderBy=-${sortoption}` : `&orderBy=${sortoption}`;
            }
            console.log(props.onSetSearch_OptionStr);
            props.onSetSearch_OptionStr(optionStr);
            props.onChangePage(1);
        }
        localStorage.setItem("types", types);
        localStorage.setItem("rarities", rarities);
        localStorage.setItem("name", name);
        localStorage.setItem("Max", Max);
        localStorage.setItem("Min", Min);
        localStorage.setItem("year", year.toString());
        localStorage.setItem("month", month.toString());
        localStorage.setItem("day", day.toString());
        localStorage.setItem("reverse", reverse ? "true" : "false");
        localStorage.setItem("sortoption", sortoption);
        props.onOpen(false);
    };
    const onTypeChange = (event: materialui.SelectChangeEvent<string>) => {
        SetTypes(event.target.value);
    };
    const onRaritiesChange = (event: materialui.SelectChangeEvent<string>) => {
        SetRarities(event.target.value);
    }
    const onNameChange = (event: any) => {
        SetName(event.target.value);
    }
    const onHPMinChange = (event: any) => {
        SetMin(event.target.value);
    }
    const onHPMaxChange = (event: any) => {
        SetMax(event.target.value);
    }
    const onYearChange = (event: any) => {
        setYear(event.target.value);
    }
    const onMonthChange = (event: any) => {
        setMonth(event.target.value);
    }
    const onDayChange = (event: any) => {
        setDay(event.target.value);
    }
    const onClickRestSearch = () => {
        SetTypes(types => "Default");
        SetRarities("Default");
        SetName("Default");
        SetMin("*");
        SetMax("*");
        setYear(0);
        setMonth(0);
        setSort("Default");
        setReverse(true);
        setDay(day => 0);
    }
    return (
        <div>
            {/* Search Info */}
            <DialogTitle>Search Options</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                    <Grid direction="row" alignItems="center" justifyContent="left" container >
                        <Grid item>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>Types(屬性)</InputLabel>
                                <Select
                                    native
                                    value={types}
                                    onChange={onTypeChange}
                                    input={<OutlinedInput label="Types(屬性)" />}
                                >
                                    {
                                        Type.map((item, i) => {
                                            return (
                                                <option key={i} value={item}>{item}</option>
                                            )
                                        })
                                    }
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
                                    {
                                        Rarity.map((item, i) => {
                                            let showValue = "";
                                            if (item.indexOf("\"") !== -1) {
                                                showValue = item.replace("\"", "");
                                                showValue = showValue.replace("\"", "");
                                            } else {
                                                showValue = item;
                                            }
                                            return (
                                                <option key={i} value={item}>{showValue}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 200 }}>
                            <TextField label="Name" type="search" value={name} onChange={onNameChange} />
                        </FormControl>
                        <Grid item>
                            {/* <Grid direction="row" alignItems="center" justifyContent="center" container > */}
                            <FormControl sx={{ m: 1, minWidth: 50, maxWidth: 150 }}>
                                <TextField label="HP Min" type="search" value={Min} onChange={onHPMinChange} />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 10 }}>
                                <FormLabel > to</FormLabel>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 50, maxWidth: 150 }}>
                                <TextField label="Hp Max" type="search" value={Max} onChange={onHPMaxChange} />
                            </FormControl>
                        </Grid>
                        <Grid direction="row" alignItems="center" justifyContent="center" container >
                            <FormLabel style={{ color: "Blue" }} >Release Date:</FormLabel>
                            <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 150 }}>
                                <TextField label="year" type="number" InputLabelProps={{ shrink: true, }} value={year} onChange={onYearChange} />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 50, maxWidth: 100 }}>
                                <TextField label="month" type="number" InputLabelProps={{ shrink: true, }} value={month} onChange={onMonthChange} />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 50, maxWidth: 100 }}>
                                <TextField label="day" type="number" InputLabelProps={{ shrink: true, }} value={day} onChange={onDayChange} />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Grid alignItems="center" justifyContent="center" container spacing={3} >
                    <Grid item>
                        <FormControlLabel disabled={sortoption === "Default"} value={sortoption === "-" ? true : false} control={<Switch checked={reverse} onChange={(event: React.SyntheticEvent<Element, Event>, checked: boolean) => { setReverse(checked); }} />} label="Reverse" />
                        <FormLabel style={{ color: "orchid", verticalAlign: "middle", fontWeight: 100 }}> sort by : </FormLabel>
                    </Grid>
                    <Grid item>
                        <RadioGroup row aria-label="gender" value={sortoption} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSort(event.target.value) }}>
                            <FormControlLabel value="Default" control={<Radio />} label="Default" />
                            <FormControlLabel value="name" control={<Radio />} label="Name" />
                            <FormControlLabel value="rarity" control={<Radio />} label="Rarities" />
                            <FormControlLabel value="types" control={<Radio />} label="Type" />
                            <FormControlLabel value="set.releaseDate" control={<Radio />} label="Releas Date" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid alignItems="center" justifyContent="center" container spacing={5}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => handleClose("", "Cancel")}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={() => handleClose("", "Ok")}>Ok</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="warning" onClick={() => onClickRestSearch()}>Reset</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </div>
    )
}
export default SearchUI;


