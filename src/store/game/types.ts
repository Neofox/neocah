// Describing the shape of the system's slice of state
import {DeckType, GameType} from "../../utils/types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type ThunkType<ReturnType> = ThunkAction<ReturnType, any, { getFirebase: any, getFirestore: any }, GameActionTypes>
export type ThunkDispatchType = ThunkDispatch<any, { getFirebase: any, getFirestore: any }, GameActionTypes>;

export interface GameState {
    error: string | null
}

export interface CreateGamePayload {
    decks: DeckType[],
    password: string,
    maxScore: number
}

export interface JoinGamePayload {
    gameId: string,
    password: string,
}

export const GAME_CREATION_ERROR = "GAME_CREATION_ERROR";
export const QUIT_GAME = "QUIT_GAME";
export const TOGGLE_READY = "TOGGLE_READY";
export const GAME_JOIN_SUCCESS = "GAME_JOIN_SUCCESS";
export const GAME_JOIN_ERROR = "GAME_JOIN_ERROR";

interface CreateGameAction {
    type: typeof GAME_CREATION_ERROR;
    payload: any | GameType
}

interface JoinGameAction {
    type: typeof GAME_JOIN_SUCCESS | typeof GAME_JOIN_ERROR;
    payload?: any
}

interface QuitGameAction {
    type: typeof QUIT_GAME;
}

interface ToggleReadyAction {
    type: typeof TOGGLE_READY;
}

export type GameActionTypes = CreateGameAction | JoinGameAction | QuitGameAction | ToggleReadyAction;
