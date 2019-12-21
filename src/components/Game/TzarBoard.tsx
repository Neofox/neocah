import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PlayerList from "./PlayerList";
import BlackCardDisplay from "./BlackCardDisplay";
import PlayedCards from "./PlayedCards";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const TzarBoard: React.FC = () => {
    const auth = useSelector((state: any) => state.firebase.auth);
    if (!auth.uid) {return <Redirect to={"/sign-in"} />}

    return (
        <Container>
            <Grid container>
                <Grid item lg={3}>
                    <BlackCardDisplay/>
                </Grid>
                <Grid item lg={9}>
                    <PlayedCards/>
                </Grid>
                <Grid item lg={3}>
                    <PlayerList/>
                </Grid>
            </Grid>
        </Container>
    )
};

export default TzarBoard;
