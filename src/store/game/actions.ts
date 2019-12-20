import {UPDATE_GAME, GameType, FETCH_GAME, CREATE_GAME, GameState} from "./types";
import {getFirebase} from "react-redux-firebase";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {ThunkType} from "../index";

export function updateGame(newGame: GameType) {
    return {
        type: UPDATE_GAME,
        payload: newGame
    };
}

export function fetchGames() {
    return {
        type: FETCH_GAME
    };
}

export const createGame = (newGame: GameType): ThunkType => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({
            type: CREATE_GAME,
            payload: newGame
        });
    }

}

