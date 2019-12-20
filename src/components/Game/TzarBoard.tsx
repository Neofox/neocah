import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PlayerList from "./PlayerList";
import BlackCardDisplay from "./BlackCardDisplay";
import PlayedCards from "./PlayedCards";

const TzarBoard: React.FC = () => {
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
