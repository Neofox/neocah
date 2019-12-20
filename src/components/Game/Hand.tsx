import React from 'react';
import Card from './Card';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(10),
        },
    })
);

const Hand: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {Array(10).fill(Number).map((_, i) => (
                <Card zIndex={1+i} hover={true} margin="-4%" key={i}/>
            ))}
        </div>
    )
};

export default Hand;
