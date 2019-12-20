import { UserType, LOG_IN, LOG_OUT, UPDATE_USER } from "./types";

export function logIn(user: UserType) {
    return {
        type: LOG_IN,
        payload: user
    };
}

export function logOut() {
    return {type: LOG_OUT};
}

export function updateUser(user: UserType) {
    return {
        type: UPDATE_USER,
        payload: user
    };
}
