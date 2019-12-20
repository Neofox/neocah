import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router, Route} from "react-router-dom";
import theme from "./theme";
import Homescreen from "./Homescreen/Homescreen";
import Lobby from "./Lobby/Lobby";
import Board from './Game/Board';
import TzarBoard from './Game/TzarBoard';
import {logIn} from "../store/system/actions";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Favorites from "./Favorites/Favorites";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);


const App: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(logIn({
            name: "Neofox",
            inGame: false
        }))
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Cards Against Humanity
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Router>
                <Route exact path="/" render={() => <Homescreen/>}/>
                <Route exact path="/board" render={() => <Board/>}/>
                <Route exact path="/board-tzar" render={() => <TzarBoard/>}/>
                <Route exact path="/lobby" render={() => <Lobby/>}/>
                <Route exact path="/sign-in" render={() => <SignIn/>}/>
                <Route exact path="/favorites" render={() => <Favorites/>}/>
                <Route exact path="/sign-up" render={() => <SignUp/>}/>
            </Router>
        </ThemeProvider>
    )
};

export default App;
