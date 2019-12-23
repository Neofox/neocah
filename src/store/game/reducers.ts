import {GAME_JOIN_ERROR, GAME_JOIN_SUCCESS, GameActionTypes, GameState} from "./types";

const initialState: GameState = {
    game: null,
    error: null
};

export function gameReducer(state = initialState, action: GameActionTypes): GameState {
    switch (action.type) {
        case GAME_JOIN_SUCCESS: {
            return {
                ...state,
                game: action.payload,
                error: null
            };
        }
        case GAME_JOIN_ERROR: {
            return {
                ...state,
                game: null,
                error: action.payload
            };
        }
        default:
            return state;
    }
}
