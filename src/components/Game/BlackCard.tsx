import React, {useState} from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(3),
            padding: theme.spacing(3),
            position: "relative",
            display: "inline-block",
            background: "transparent",
            color: "#000",
            width: 200,
            height: 250,
            cursor: "pointer",
        },
        face: {
            position: "absolute",
            border: "1px solid #333",
            color: "white",
            width: 200,
            height: 250,
            lineHeight: "3em",
            textAlign: "center",
            textTransform: "capitalize",
            borderRadius: 10,
            boxShadow: "4px 4px 10px #555",
        },
        front: {
            background: "black",
            transform: "rotateX(0deg) rotateY(0deg)",
            transition: "all .4s ease-in-out",
            backfaceVisibility: "visible",
            zIndex: 10,
        },
        back: {
            background: "purple",
            transform: "rotateX(0deg) rotateY(180deg)",
            transformStyle: "preserve-3d",
            transition: "all .4s ease-in-out",
            backfaceVisibility: "hidden",
            zIndex: 5,
        }
    })
);

const Card = () => {
    const classes = useStyles();
    const [front, toggleFront] = useState(true);

    return (
        <div className={classes.root} onClick={() => toggleFront(!front)}>
            <div className={clsx(classes.face, classes.front)}>front</div>
            <div className={clsx(classes.face, classes.back)}/>
        </div>
    )
};

export default Card;
