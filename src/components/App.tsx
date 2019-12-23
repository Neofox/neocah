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
                <Route exact path="/" ><Homescreen/></Route>
                <Route exact path="/board"><Board/></Route>
                <Route exact path="/board-tzar"><TzarBoard/></Route>
                <Route exact path="/lobby"><Lobby/></Route>
                <Route exact path="/sign-in"><SignIn/></Route>
                <Route exact path="/favorites"><Favorites/></Route>
                <Route exact path="/sign-up"><SignUp/></Route>
            </Router>
        </ThemeProvider>
    )
};

export default App;
