import {
    GAME_CREATION_ERROR,
    GAME_JOIN_ERROR,
    GAME_JOIN_SUCCESS,
    GameActionTypes,
    GameState,
    QUIT_GAME,
    TOGGLE_READY
} from "./types";

const initialState: GameState = {
    error: null
};

export function gameReducer(state = initialState, action: GameActionTypes): GameState {
    switch (action.type) {
        case GAME_JOIN_SUCCESS: {
            return {...state, error: null};
        }
        case GAME_JOIN_ERROR: {
            return {...state, error: action.payload};
        }
        case GAME_CREATION_ERROR: {
            return {...state, error: action.payload};
        }
        case QUIT_GAME: {
            return {...state};
        }
        case TOGGLE_READY: {
            return {...state};
        }
        default:
            return state;
    }
}
