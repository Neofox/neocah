import React from 'react';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {quitGame} from "../../store/game/actions";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../../store/game/types";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3),
            width: 150,
            marginTop: theme.spacing(5)
        },
    })
);

const PlayerScore: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatchThunk = useDispatch<ThunkDispatchType>();

    const handleQuitGame = () => {
        dispatchThunk(quitGame()).then(() => {
            history.push("/");
        });
    };

    return (
        <Paper elevation={10} className={classes.root}>
            <Button onClick={handleQuitGame}>Quit</Button>
            <Typography variant="body1">
                    Score : 124
                </Typography>
        </Paper>
    )
};

export default PlayerScore;
