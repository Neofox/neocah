import {ThunkAction} from "redux-thunk";

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType,
    SystemState,
    { getFirebase: any },
    SystemActionTypes>

export interface CredentialsType {
    email: string,
    password: string
}

export interface SystemState {
    error: string | null;
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const UPDATE_USER = "UPDATE_USER";

interface SignInInAction {
    type: typeof LOGIN_SUCCESS | typeof LOGIN_ERROR;
}
interface SignOutAction {
    type: typeof SIGNOUT_SUCCESS;
}

export type SystemActionTypes = SignInInAction | SignOutAction;
