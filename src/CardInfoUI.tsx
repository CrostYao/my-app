import { Stack, DialogTitle, DialogActions, DialogContent, Button, FormLabel, Grid } from "@material-ui/core";
import React from "react";

type Props = {
    OnSelectPokemon: Struct.Pokemon;
    isFavor: boolean
    CloseCardinfo: () => void;
    RemoveFavorite: (pokemon: Struct.Pokemon) => void;
    SetFavorite: (pokemon: Struct.Pokemon) => void;
    FavorStr: string;
}

const CardInfoUI: React.FC<Props> = (props) => {

    return (
        <div style={{
            backgroundColor: '#172742',
        }}>
            <Grid alignItems="center" justifyContent="center" container >
                <DialogTitle color="white">
                    {props.OnSelectPokemon ? props.OnSelectPokemon.name : ""}
                </DialogTitle>
            </Grid>
            <DialogContent>
                <Grid alignItems="center" justifyContent="center" container spacing={5}>
                    <Grid item>
                        {
                            props.OnSelectPokemon ?
                                <img
                                    src={props.OnSelectPokemon.images.large}
                                    alt="description" /> : ""
                        }
                    </Grid>
                </Grid>
                <Grid alignItems="center" justifyContent="center" container
                    style={{
                        backgroundColor: '#c2c7ab',
                    }}>
                    <Stack spacing={3}>
                        <Grid item>
                            <FormLabel style={{ color: "Blue", verticalAlign: "middle" }}> Series : </FormLabel>
                            <FormLabel style={{ verticalAlign: "middle" }} > {props.OnSelectPokemon ? props.OnSelectPokemon.set.series : ""} </FormLabel >
                        </Grid>
                        <Grid item>
                            <FormLabel style={{ color: "Green", verticalAlign: "middle" }}> Release Date :</FormLabel>
                            <FormLabel style={{ verticalAlign: "middle" }} >{props.OnSelectPokemon ? props.OnSelectPokemon.set.releaseDate : ""} </FormLabel >
                        </Grid>
                        <Grid item>
                            <FormLabel style={{ color: "red", verticalAlign: "middle" }}> Rarity : </FormLabel>
                            <FormLabel style={{ verticalAlign: "middle" }} > {props.OnSelectPokemon ? props.OnSelectPokemon.rarity : ""} </FormLabel >
                        </Grid>
                    </Stack>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid alignItems="center" justifyContent="center" container spacing={5}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => props.CloseCardinfo()}>Close</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={() => { props.isFavor ? props.RemoveFavorite(props.OnSelectPokemon) : props.SetFavorite(props.OnSelectPokemon) }}>{props.FavorStr}</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </div >
    )
}
export default CardInfoUI;
