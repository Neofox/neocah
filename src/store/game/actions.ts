import {GAME_CREATION_SUCCESS, GAME_CREATION_ERROR, CreateGamePayload, ThunkType} from "./types";
import shortid from "shortid";
import {GameType} from "../../utils/types";

export function createGame(newGame: CreateGamePayload): ThunkType<Promise<boolean>> {
    return (dispatch, getState, {getFirebase}): Promise<boolean> => {
        const firestore = getFirebase().firestore();

        const id = shortid.generate().toUpperCase();
        const userId = getState().firebase.auth.uid;
        const currentUser = firestore.collection('users').doc(userId);

        return currentUser.get().then(() => {
            const game: GameType = {id, ...newGame, players: [currentUser] };

            return firestore.collection('games').add(game)
                .then(
                () => {
                    dispatch({
                        type: GAME_CREATION_SUCCESS,
                        payload: game
                    });
                })
                .catch((err: any) => {
                    dispatch({
                        type: GAME_CREATION_ERROR,
                        payload: err
                    })
                })
        })


    }
}
