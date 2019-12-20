import React from 'react';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(3),
            padding: theme.spacing(2),
            width: 300
        },
        score: {
            padding: 5
        }
    })
);

const PlayerList: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper elevation={10} className={classes.root}>

        <Typography variant="body1" className={classes.score}>
                Player 1 : Score 23
            </Typography>
            <Typography variant="body1" className={classes.score}>
                Player 2 : Score 1
            </Typography>
            <Typography variant="body1" className={classes.score}>
                Player 3 : Score 12
            </Typography>
            <Typography variant="body1" className={classes.score}>
                Player 4 : Score 12
            </Typography>

        </Paper>
    )
};

export default PlayerList;
