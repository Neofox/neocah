import React from 'react';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useSelector} from "react-redux";
import {useFirestoreConnect, isLoaded} from "react-redux-firebase";
import {RootState} from "../../store";
import {GameType} from "../../utils/types";

interface Column {
    id: 'id' | 'maxScore' | 'password';
    label: string;
    minWidth?: number;
}

const columns: Column[] = [
    {id: 'id', label: 'ID', minWidth: 170},
    {id: 'maxScore', label: 'Max Score', minWidth: 100},
    {id: 'password', label: 'password', minWidth: 100},

];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(3),
        },
        container: {
            maxHeight: 200,
        },
    })
);

const GameList = () => {
    const classes = useStyles();

    useFirestoreConnect([
        {collection: 'games'}
    ]);

    const games = useSelector((state: RootState) => state.firestore.ordered.games);

    const getBody = (games: GameType[]) => (
        games.map((game: GameType) => {
            if (game === undefined) return <TableRow/>;
            return (
                <TableRow hover tabIndex={-1} key={game.id}>
                    {columns.map(column => {
                        const value = game[column.id];
                        return (
                            <TableCell key={column.id}>
                                {column.id === 'password' ? value ? 'Yes' : 'No' : value}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        })
    )

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="game available" size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column.id} style={{minWidth: column.minWidth}}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoaded(games) ? getBody(games) : <TableRow><TableCell>Loading...</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default GameList;
