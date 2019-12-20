import React from 'react';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 400,
            height: 400,
            margin: theme.spacing(5),
            padding: theme.spacing(4),
        },
        button: {
            marginTop: theme.spacing(13),
            marginLeft: theme.spacing(1),
        },
        title: {
            marginBottom: theme.spacing(2)
        }
    })
);

const JoinGameForm: React.FC = () => {
    const classes = useStyles();

    return (
        <form noValidate autoComplete="off">
            <Paper className={classes.root}>
                <Typography className={classes.title} variant="h4" align="center">JOIN</Typography>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                        <TextField required id="ID" name="ID" label="Game ID" fullWidth variant="outlined"/>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <TextField id="passwordJoin" name="passwordJoin" label="Password (not required)" type="password" fullWidth/>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <Button variant="contained" color="primary" onClick={() => {}} fullWidth className={classes.button}>
                            Join the game
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    )
};

export default JoinGameForm;
