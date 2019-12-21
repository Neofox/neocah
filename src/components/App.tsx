import React from 'react';
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {BrowserRouter as Router, Route} from "react-router-dom";
import theme from "./theme";
import Appbar from './Appbar';
import Homescreen from "./Homescreen/Homescreen";
import Board from './Game/Board';
import TzarBoard from './Game/TzarBoard';
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Favorites from "./Favorites/Favorites";
import Lobby from "./Lobby/Lobby";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Appbar />
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
