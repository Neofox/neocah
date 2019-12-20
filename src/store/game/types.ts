// Describing the shape of the system's slice of state
import {UserType} from "../system/types";
import {DeckType} from "../../utils/types";

export interface GameType {
    id: string,
    maxScore: number,
    decks: DeckType[],
    password: string|undefined,
    players: UserType[]
}

export interface GameState {
    games: GameType[]
}


export const UPDATE_GAME = "UPDATE_GAME";
export const FETCH_GAME = "FETCH_GAME";
export const CREATE_GAME = "CREATE_GAME";

interface UpdateGameAction {
    type: typeof UPDATE_GAME;
    payload: GameType
}

interface CreateGameAction {
    type: typeof CREATE_GAME;
    payload: GameType
}

interface FetchGameAction {
    type: typeof FETCH_GAME;
}

export type GameActionTypes = UpdateGameAction | FetchGameAction;
