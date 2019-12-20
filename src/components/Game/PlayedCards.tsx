import React from 'react';
import Card from './Card';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(8),
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 500,
            minHeight: 300,
        },
        card: {
            margin: theme.spacing(2),
        }
    })
);

const PlayedCards: React.FC = () => {
    const classes = useStyles();
    return (
        <Paper elevation={10} className={classes.root}>
            {Array(5).fill(Number).map((_, i) => (
                <div className={classes.card} key={i}>
                    <Card hover={false} zIndex={0}/>
                </div>
            ))}
        </Paper>
    )
};

export default PlayedCards;
