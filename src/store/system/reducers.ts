import {LOG_IN, LOG_OUT, SystemActionTypes, SystemState, UPDATE_USER} from "./types";

const initialState: SystemState = {
    loggedIn: false,
    user: undefined,
};

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                loggedIn: false,
                user: undefined
            };
        }
        case UPDATE_USER: {
            return {
                ...state,
                user: action.payload
            };
        }
        default:
            return state;
    }
}
