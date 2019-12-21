import {LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT_SUCCESS, SystemActionTypes, SystemState} from "./types";

const initialState: SystemState = {
    error: null
};

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                error: null
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                error: 'Login failed'
            };
        }
        case SIGNOUT_SUCCESS: {
            return {...state,};
        }
        default:
            return state;
    }
}
