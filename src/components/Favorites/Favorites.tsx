import React from 'react';
import clsx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {DeckType} from "../../utils/types";
import {TextField} from "@material-ui/core";
import {isLoaded, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {getDeck} from "../../utils/cardcast-api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {green} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    listItem: {
        padding: theme.spacing(1, 0),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    addButton: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center"
    },
    listDesc: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        maxWidth: "65%"
    }
}));

const Favorites = () => {
    const classes = useStyles();
    const firestore = useFirestore();
    const [deckId, setDeckId] = React.useState<string>('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const auth = useSelector((state: any) => state.firebase.auth);
    const decks: DeckType[] = useSelector((state: RootState) => state.firestore.ordered.decks) || [];

    useFirestoreConnect([
        {collection: 'decks'}
    ]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeckId(event.target.value);
        setSuccess(false);
    };
    const addDeck = () => {
        setLoading(true);
        setSuccess(false);
        getDeck(deckId.toUpperCase()).then(deck => {
            firestore.collection('decks').doc(deck.id).set(deck).then(() => {
                setLoading(false);
                setSuccess(true);
            })
        })
    };

    if (!auth.uid) {return <Redirect to={"/sign-in"} />}

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Favorites
                </Typography>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        View decks
                    </Typography>
                    <List disablePadding>
                        {isLoaded(decks) ? (decks.map(deck => (
                            <ListItem button className={classes.listItem} key={deck.name}>
                                <ListItemText className={classes.listDesc} primary={deck.name}
                                              secondary={deck.description}/>
                                <ListItemText primary={deck.whiteCards.length} secondary="White cards"/>
                                <ListItemText primary={deck.blackCards.length} secondary="Black cards"/>
                            </ListItem>
                        ))) : (
                            <ListItem button className={classes.listItem}>
                                <ListItemText primary="Loading..."/>
                            </ListItem>
                        )}

                    </List>
                    <div className={classes.addButton}>
                        <TextField id="add-deck" label="Add a deck" variant="outlined" value={deckId}
                                   onChange={handleChange}/>
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={clsx({[classes.buttonSuccess]: success,})}
                                disabled={loading}
                                onClick={addDeck}>
                                ADD
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </div>
                    </div>
                </React.Fragment>
            </Paper>
        </main>
    );
};

export default Favorites;
