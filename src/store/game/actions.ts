import {GAME_JOIN_SUCCESS, GAME_JOIN_ERROR, CreateGamePayload, ThunkType, JoinGamePayload} from "./types";
import shortid from "shortid";
import {GameType} from "../../utils/types";

export function createGame(newGame: CreateGamePayload): ThunkType<Promise<any>> {
    return (dispatch, getState, {getFirebase}): Promise<boolean> => {
        const firestore = getFirebase().firestore();

        const gameId = shortid.generate().toUpperCase();
        const userId = getState().firebase.auth.uid;
        const game: GameType = {id: gameId, ...newGame, players: [userId] };

        return firestore.collection('games').doc(gameId).set(game)
            .then(() => {
                dispatch({
                    type: GAME_JOIN_SUCCESS,
                    payload: game
                });
            })
            .catch((err: any) => {
                dispatch({
                    type: GAME_JOIN_ERROR,
                    payload: err
                })
            })
    }
}

export function joinGame(joinGame: JoinGamePayload): ThunkType<Promise<any>> {
    return (dispatch, getState, {getFirebase}): Promise<any> => {
        const firestore = getFirebase().firestore();
        const game: GameType = getState().firestore.data.games[joinGame.gameId];

        if (!game || game.password !== joinGame.password) {
            const error = "Invalid ID or password";
            dispatch({
                type: GAME_JOIN_ERROR,
                payload: error
            });
            return Promise.resolve({error})
        } else {
            const userId = getState().firebase.auth.uid;
            return firestore.collection('games').doc(joinGame.gameId).set({
                players: [userId]
            }, {merge: true}).then(() => {
                dispatch({
                    type: GAME_JOIN_SUCCESS,
                    payload: game
                });
                return {error: null}
            });
        }
    }
}
