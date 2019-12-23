import React from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {GameType} from "../../utils/types";
import {ThunkDispatchType} from "../../store/game/types";
import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import {ListSubheader} from "@material-ui/core";
import {quitGame, toggleReady} from "../../store/game/actions";
import {useFirestoreConnect} from "react-redux-firebase";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
        },
        list: {
            backgroundColor: theme.palette.background.paper,
        },
        margin: {
            marginTop: theme.spacing(5)
        },
        button: {

        }
    })
);

const Lobby: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const dispatchThunk = useDispatch<ThunkDispatchType>();
    const auth = useSelector(({firebase}: any) => firebase.auth);
    const user = useSelector(({firebase}: any) => firebase.profile);

    useFirestoreConnect([
        {collection: 'games', doc: user.currentGame}
    ]);

    const game: GameType = useSelector(({firestore: {data}}: any) => data.games && data.games[user.currentGame]);

    const handleQuitGame = () => {
        dispatchThunk(quitGame()).then(() => {
            history.push("/");
        });
    };
    const handleReady = () => dispatch(toggleReady());

    if (!auth.uid) {return <Redirect to={"/sign-in"} />}

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item lg={12} md={12} xs={12}>
                    <Typography variant="subtitle1" align="center">room ID</Typography>
                    {user && (
                        <Typography variant="h2" align="center">{user.currentGame}</Typography>
                    )}
                </Grid>
                {game && game.password && (
                    <Grid item lg={12} md={12} xs={12}>
                        <Typography variant="subtitle1" align="center">password</Typography>
                        <Typography variant="h4" align="center">{game.password}</Typography>
                    </Grid>
                )}
                <Grid item lg={12} md={12} xs={12}>
                    <List className={clsx(classes.list, classes.margin)} subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Player list
                        </ListSubheader>
                    }>
                        <ListItem key={auth.id} role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={user.ready || false}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': 'checkbox-list-label-me' }}
                                />
                            </ListItemIcon>
                            <ListItemText id='checkbox-list-label-me' primary={user.name} />
                        </ListItem>
                        {game && game.players.map(player => {
                            if (player.id === auth.uid) return null;
                            const labelId = `checkbox-list-label-${player.id}`;
                            return (
                                <ListItem key={player.id} role={undefined} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={player.ready}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={player.name} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Button className={clsx(classes.margin, classes.button)} onClick={handleReady} fullWidth size="large" variant="contained" color="primary">
                        READY
                    </Button>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Button className={clsx(classes.margin, classes.button)} onClick={handleQuitGame} fullWidth size="large" variant="contained" color="secondary">
                        QUIT
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Lobby;
