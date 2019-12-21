import {FETCH_GAME, GameActionTypes, GameState, GameType, UPDATE_GAME} from "./types";

const initialState: GameState = {
    games: []
};


export function gameReducer(state = initialState, action: GameActionTypes): GameState {
    switch (action.type) {
        case UPDATE_GAME: {
            return {
                ...state,
                ...action.payload
            };
        }
        case FETCH_GAME: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
