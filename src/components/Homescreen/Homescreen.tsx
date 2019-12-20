import React from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CreateGameForm from "./CreateGameForm";
import GameList from './GameList'
import JoinGameForm from "./JoinGameForm";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        center: {
            display: "flex",
            justifyContent: "center"
        },
        list: {

            backgroundColor: theme.palette.background.paper,
        },
        margin: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(2)
        }
    })
);

const Homescreen: React.FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <Grid container justify="center">
                <Grid item lg={12} md={12} xs={12} className={classes.center}>
                     <GameList />
                </Grid>
                <Grid item lg={5} md={12} xs={12} className={classes.center}>
                    <CreateGameForm/>
                </Grid>
                <Grid item lg={1} md={1} xs={1} className={classes.center}>
                    <Divider orientation="vertical" variant="fullWidth" />
                </Grid>
                <Grid item lg={5} md={12} xs={12} className={classes.center}>
                    <JoinGameForm/>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Homescreen;
