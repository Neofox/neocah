import React, {useState} from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

type CardProps = {
    zIndex?: number,
    margin?: string,
    hover?: boolean
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (props: CardProps) => ({
            position: "relative",
            display: "inline-block",
            background: "transparent",
            color: "#fff",
            width: 150,
            height: 200,
            cursor: "pointer",
            zIndex: props.zIndex,
            marginRight: props.margin,
            '&:hover': props.hover ? {
                zIndex: 1000,
                transform: "scale(1.2)",
            } : {}
        }),
        face: {
            position: "absolute",
            border: "1px solid #333",
            color: "#000",
            width: 150,
            height: 200,
            lineHeight: "3em",
            textAlign: "center",
            textTransform: "capitalize",
            borderRadius: 10,
            boxShadow: "4px 4px 10px #555",
        },
        front: {
            background: "#fff",
            transform: "rotateX(0deg) rotateY(0deg)",
            transition: "all .4s ease-in-out",
            backfaceVisibility: "visible",
            zIndex: 10,
        },
        back: {
            background: "grey",
            transform: "rotateX(0deg) rotateY(180deg)",
            transformStyle: "preserve-3d",
            transition: "all .4s ease-in-out",
            backfaceVisibility: "hidden",
            zIndex: 5,
        },
        frontFlip: {
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
            transition: "all .4s ease-in-out",
            backfaceVisibility: "hidden",
            zIndex: 900,
        },
        backFlip: {
            transform: "rotateY(0deg)",
            transformStyle: "preserve-3d",
            transition: "all .4s ease-in-out",
            backfaceVisibility: "visible",
            zIndex: 1000,
        }
    })
);

const Card = (props: CardProps) => {
    const classes = useStyles(props);
    const [front, toggleFront] = useState(true);
    return (
        <div className={clsx(classes.root)}  onClick={() => toggleFront(!front)}>
            <div className={clsx(classes.face, classes.front, {[classes.frontFlip]: !front})}>front</div>
            <div className={clsx(classes.face, classes.back, {[classes.backFlip]: !front})}/>
        </div>
    )
};

export default Card;
