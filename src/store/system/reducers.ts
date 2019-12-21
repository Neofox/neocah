import {
    SIGNIN_ERROR,
    SIGNIN_SUCCESS,
    SIGNOUT_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    SystemActionTypes,
    SystemState
} from "./types";

const initialState: SystemState = {
    error: null
};

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
        case SIGNIN_SUCCESS: {
            return {...state, error: null};
        }
        case SIGNIN_ERROR: {
            return {...state, error: 'Login failed'};
        }
        case SIGNOUT_SUCCESS: {
            return {...state};
        }
        case SIGNUP_SUCCESS: {
            return {...state, error: null};
        }
        case SIGNUP_ERROR: {
            return {...state, error: action.payload.message};
        }
        default:
            return state;
    }
}
