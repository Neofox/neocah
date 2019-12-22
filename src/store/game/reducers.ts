import {GAME_CREATION_ERROR, GAME_CREATION_SUCCESS, GameActionTypes, GameState} from "./types";

const initialState: GameState = {
    game: null,
    error: null
};

export function gameReducer(state = initialState, action: GameActionTypes): GameState {
    switch (action.type) {
        case GAME_CREATION_SUCCESS: {
            return {
                ...state,
                game: action.payload
            };
        }
        case GAME_CREATION_ERROR: {
            return {
                ...state,
                error: action.payload
            };
        }
        default:
            return state;
    }
}
