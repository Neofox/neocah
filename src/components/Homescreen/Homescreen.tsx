import React, {useEffect} from 'react';
import {useHistory, Redirect} from "react-router-dom"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CreateGameForm from "./CreateGameForm";
import GameList from './GameList'
import JoinGameForm from "./JoinGameForm";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {GameType} from "../../utils/types";
import {putUserInGame} from "../../store/system/actions";
import {ThunkDispatchType} from "../../store/game/types";

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
    //const dispatch = useDispatch<ThunkDispatchType>();
    //const history = useHistory();
    const user = useSelector(({firebase}: any) => firebase.profile);
    const auth = useSelector(({firebase}: any) => firebase.auth);
    const games = useSelector(({firestore}: any) => firestore.ordered.games);

    useEffect(() => { // Put the user in the game he should have been in
        const userInGame = games && games.filter((game: GameType) => {
            return game.players.find((data) => data.id === auth.uid)
        });
        if (games && userInGame.length > 0) {
            // dispatch(putUserInGame(auth.uid, userInGame[0] )).then(() => {
            //     history.push('/lobby')
            // })
        }
    }, [games, auth.uid]);

    if (user.isLoaded && user.currentGame !== null) {return <Redirect to={"/lobby"}/>}
    if (!auth.uid) {return <Redirect to={"/sign-in"} />}

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
