import React, { useState} from 'react';
import {useFirestoreConnect} from 'react-redux-firebase'
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import {DeckType} from "../../utils/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {createGame} from "../../store/game/actions";
import {ThunkDispatchType} from "../../store/game/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 400,
            height: 400,
            margin: theme.spacing(5),
            padding: theme.spacing(4),
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        formControl: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            minWidth: 300,
            maxWidth: 350,
        },
        title: {
            marginBottom: theme.spacing(2)
        }
    })
);

const CreateGameForm: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch<ThunkDispatchType>();
    const history = useHistory();
    const [deckName, setDeckName] = useState<string[]>([]);
    const [maxScore, setMaxScore] = useState<number>(10);
    const [password, setPassword] = useState<string>("");
    const decks = useSelector((state: RootState) => state.firestore.ordered.decks) || [];

    useFirestoreConnect([
        {collection: 'decks'}
    ]);

    const handleDeckChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDeckName(event.target.value as string[]);
    };
    const handleMaxScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxScore(Number(event.target.value));
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const create = () => {
        const deckList: DeckType[] = decks.filter((deck: DeckType) => deckName.includes(deck.name));
         dispatch(createGame({decks: deckList, maxScore, password})).then(() => {
             history.push('/lobby');
         })
    };

    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h4" align="center">CREATE</Typography>
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12}>
                    <TextField required type="number" id="maxScore" name="maxScore" label="Score Max" fullWidth value={maxScore} onChange={handleMaxScoreChange}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-decks">Decks</InputLabel>
                        <Select
                            labelId="select-decks"
                            id="select-decks"
                            multiple
                            value={deckName}
                            onChange={handleDeckChange}
                            input={<Input id="select-multiple-chip"/>}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {(selected as string[]).map(value => (
                                        <Chip key={value} label={value} className={classes.chip}/>
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {decks.map((deck: DeckType) => (
                                <MenuItem key={deck.id} value={deck.name}>
                                    {deck.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={12} md={12} xs={10}>
                    <TextField id="passwordCreate" name="passwordCreate" label="Password (not required)" type="password" fullWidth value={password} onChange={handlePasswordChange}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Button variant="contained" color="primary" onClick={create} fullWidth>
                        Create the game
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
};

export default CreateGameForm;
