import React, {useState} from 'react';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {ThunkDispatchType} from "../../store/game/types";
import {joinGame} from "../../store/game/actions";
import {useAsyncSetState} from "../../hooks/usestate-callback";

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
    const dispatch = useDispatch<ThunkDispatchType>();
    const [gameId, setGameId] = useState<string>("");
    const [gamePassword, setGamePassword] = useState<string>("");
    const [error, setError] = useAsyncSetState({error: false, message: ""});
    const handleGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError({error: false, message: ""});
        setGameId(event.target.value.toUpperCase());
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError({error: false, message: ""});
        setGamePassword(event.target.value);
    };

    const joinGameHandler = () => {
        dispatch(joinGame({gameId, password: gamePassword})).then(res => {
            if (res.error !== null) {
                setError({error: true, message: res.error});
            } else {
                setError({error: false, message: ""}).then(() => history.push('/lobby'));
            }
        });
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
                        <Button variant="contained" color="primary" onClick={joinGameHandler} fullWidth>
                            Join the game
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    )
};

export default JoinGameForm;
