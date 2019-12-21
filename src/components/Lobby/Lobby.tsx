import React from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import {ListSubheader} from "@material-ui/core";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
        },
        list: {
            backgroundColor: theme.palette.background.paper,
        },
        margin: {
            marginTop: theme.spacing(5)
        },
        button: {

        }
    })
);

const Lobby: React.FC = () => {
    const classes = useStyles();
    const auth = useSelector((state: any) => state.firebase.auth);
    if (!auth.uid) {return <Redirect to={"/sign-in"} />}

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item lg={12} md={12} xs={12}>
                    <Typography variant="subtitle1" align="center">room ID</Typography>
                    <Typography variant="h2" align="center">XERTY</Typography>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Typography variant="subtitle1" align="center">password</Typography>
                    <Typography variant="h4" align="center">toto</Typography>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <List className={clsx(classes.list, classes.margin)} subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Player list
                        </ListSubheader>
                    }>
                        {[0, 1, 2, 3].map(value => {
                            const labelId = `checkbox-list-label-${value}`;
                            return (
                                <ListItem key={value} role={undefined} dense button>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={true}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`Player ${value + 1}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Button className={clsx(classes.margin, classes.button)} fullWidth size="large" variant="contained" color="primary">
                        READY
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Lobby;
