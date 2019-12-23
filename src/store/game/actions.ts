import {
    GAME_JOIN_SUCCESS,
    QUIT_GAME,
    GAME_JOIN_ERROR,
    GAME_CREATION_ERROR,
    TOGGLE_READY,
    CreateGamePayload,
    ThunkType,
    JoinGamePayload,
} from "./types";
import shortid from "shortid";
import {GameType} from "../../utils/types";

export function createGame(newGame: CreateGamePayload): ThunkType<Promise<any>> {
    return (dispatch, getState, {getFirebase}): Promise<boolean> => {
        const firestore = getFirebase().firestore();
        const gameId = shortid.generate().toUpperCase();
        const game: GameType = {id: gameId, ...newGame, players: [], status: "in_lobby"};

        return firestore.collection('games').doc(gameId).set(game)
            .then(() => {
                return dispatch(joinGame({gameId: game.id, password: game.password}))
                    .then(() => {
                        return game.id
                    });
            })
            .catch((err: any) => {
                dispatch({
                    type: GAME_CREATION_ERROR,
                    payload: err
                })
            })
    }
}

export function joinGame(joinGame: JoinGamePayload): ThunkType<Promise<any>> {
    return (dispatch, getState, {getFirebase}): Promise<any> => {
        const firestore = getFirebase().firestore();
        const game: GameType = getState().firestore.data.games[joinGame.gameId];

        if (!game || game.password !== joinGame.password) { //TODO: Maybe do that in the cloud
            const error = "Invalid ID or password";
            dispatch({
                type: GAME_JOIN_ERROR,
                payload: error
            });
            return Promise.resolve({error})
        } else {
            const userId = getState().firebase.auth.uid;
            return firestore.collection('users').doc(userId).update({
                currentGame: joinGame.gameId
            }).then(() => {
                dispatch({
                    type: GAME_JOIN_SUCCESS
                });
                return {error: null}
            });
        }
    }
}

export function quitGame(): ThunkType<Promise<void>> {
    return (dispatch, getState, {getFirebase}): Promise<void> => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        return firestore.collection('users').doc(userId).update({currentGame: null, ready: false})
            .then(() => {
                dispatch({type: QUIT_GAME})
            });
    }
}

export function toggleReady(): ThunkType<void> {
    return (dispatch, getState, {getFirebase}): Promise<any> => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        return firestore.collection('users').doc(userId).get()
            .then((userSnap: any) => {
                    const newReady = !userSnap.get('ready');
                    return firestore.collection('users').doc(userId).update({
                        ready: newReady
                    })
                }
            ).then(() => {
                dispatch({
                    type: TOGGLE_READY
                });
            });
    }
}
