import React, {useState} from 'react';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useFirestoreConnect} from "react-redux-firebase";
import {GameType} from "../../store/game/types";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 400,
            height: 400,
            margin: theme.spacing(5),
            padding: theme.spacing(4),
        },
        passwordField: {
            marginBottom: theme.spacing(5),
        },
        title: {
            marginBottom: theme.spacing(2)
        }
    })
);

const JoinGameForm: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const games = useSelector((state: RootState) => state.firestore.ordered.games) || [];
    const [gameId, setGameId] = useState<string>("");
    const [gamePassword, setGamePassword] = useState<string>("");
    const [error, setError] = useState<{error: boolean, message: string}>({error: false, message: ""});
    const handleGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError({error: false, message: ""});
        setGameId(event.target.value.toUpperCase());
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError({error: false, message: ""});
        setGamePassword(event.target.value);
    };

    useFirestoreConnect([
        {collection: 'games'}
    ]);

    const joinGame = () => {
        const game = games.find((game: GameType) => game.id === gameId);

        if (!game) {
            setError({error: true, message: "Invalid ID or password"});
            return;
        }

        if (game.password !== gamePassword) {
            setError({error: true, message: "Invalid ID or password"});
            return;
        }

        history.push("/lobby")
    };

    return (
        <form noValidate autoComplete="off">
            <Paper className={classes.root}>
                <Typography className={classes.title} variant="h4" align="center">JOIN</Typography>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                        <TextField required id="ID" name="ID" label="Game ID" fullWidth variant="outlined"
                                   value={gameId} onChange={handleGameChange}
                                   error={error.error} helperText={error.message}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} className={classes.passwordField}>
                        <TextField id="passwordJoin" name="passwordJoin" label="Password" type="password" fullWidth
                                   value={gamePassword} onChange={handlePasswordChange}
                                   error={error.error} helperText={error.message}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <Button variant="contained" color="primary" onClick={joinGame} fullWidth>
                            Join the game
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    )
};

export default JoinGameForm;
