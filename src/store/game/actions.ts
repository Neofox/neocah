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
import generate from "nanoid/generate";
import {GameType} from "../../utils/types";

export const createGame = (newGame: CreateGamePayload): ThunkType<Promise<any>> => {
    return async (dispatch, getState, {getFirebase}): Promise<any> => {
        const firestore = getFirebase().firestore();
        try {
            const gameId = generate('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5); // ID of 5 chars
            const game: GameType = {id: gameId, ...newGame, players: [], status: "in_lobby"};
            await firestore.collection('games').doc(gameId).set(game);
            return await dispatch(joinGame({gameId: game.id, password: game.password}))
        } catch (err) {
            dispatch({type: GAME_CREATION_ERROR, payload: err})
        }
    }
};

export function joinGame(joinGame: JoinGamePayload): ThunkType<Promise<any>> {
    return async (dispatch, getState, {getFirebase}): Promise<any> => {
        const firestore = getFirebase().firestore();
        const game: GameType = getState().firestore.data.games[joinGame.gameId];

        if (!game || game.password !== joinGame.password) { //TODO: Maybe do that in the cloud
            dispatch({type: GAME_JOIN_ERROR, payload: "Invalid ID or password"});
            return Promise.resolve({error: "Invalid ID or password"})
        }

        const userId = getState().firebase.auth.uid;
        await firestore.collection('users').doc(userId).update({
            currentGame: joinGame.gameId
        });
        dispatch({type: GAME_JOIN_SUCCESS});
        return Promise.resolve({error: null})
    }
}

export function quitGame(): ThunkType<Promise<void>> {
    return async (dispatch, getState, {getFirebase}): Promise<void> => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        await firestore.collection('users').doc(userId).update({currentGame: null, ready: false});
        dispatch({type: QUIT_GAME});
    }
}

export function toggleReady(): ThunkType<void> {
    return async (dispatch, getState, {getFirebase}): Promise<any> => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        const userSnapshot = await firestore.collection('users').doc(userId).get();
        const newReady = !userSnapshot.get('ready');
        await firestore.collection('users').doc(userId).update({
            ready: newReady
        });
        dispatch({type: TOGGLE_READY});
    }
}
