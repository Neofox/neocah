import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PlayerList from "./PlayerList";
import Hand from "./Hand";
import BlackCardDisplay from "./BlackCardDisplay";
import PlayerScore from "./PlayerScore";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {useFirestoreConnect} from "react-redux-firebase";

const Board: React.FC = () => {
    const auth = useSelector(({firebase}: any) => firebase.auth);
    const user = useSelector(({firebase}: any) => firebase.profile);

    useFirestoreConnect([
        {collection: 'games', doc: user.currentGame}
    ]);

    if (!auth.uid) {return <Redirect to={"/sign-in"} />}

    return (
        <Container>
            <Grid container>
                <Grid item md={4} lg={4}>
                    <PlayerScore/>
                </Grid>
                <Grid item md={4} lg={4}>
                    <BlackCardDisplay/>
                </Grid>
                <Grid item md={4} lg={4}>
                    <PlayerList/>
                </Grid>
                <Grid item md={12} lg={12}>
                    <Hand/>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Board;
