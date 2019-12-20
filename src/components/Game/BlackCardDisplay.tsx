import React from 'react';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import BlackCard from './BlackCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
    })
);

const BlackCardDisplay = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BlackCard/>
        </div>
    )
};

export default BlackCardDisplay;
