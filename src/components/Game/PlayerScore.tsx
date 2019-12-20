import React from 'react';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

    return (
        <Paper elevation={10} className={classes.root}>
            <Typography variant="body1">
                    Score : 124
                </Typography>
        </Paper>
    )
};

export default PlayerScore;
