import {ThunkAction} from "redux-thunk";

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType,
    SystemState,
    { getFirebase: any, getFirestore: any },
    SystemActionTypes>

export interface CredentialsType {
    email: string,
    password: string
}

export interface NewUserType {
    email: string,
    password: string,
    name: string
}

export interface SystemState {
    error: string | null;
}

export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

interface SignInInAction {
    type: typeof SIGNIN_SUCCESS | typeof SIGNIN_ERROR;
    payload?: any
}
interface SignOutAction {
    type: typeof SIGNOUT_SUCCESS;
}
interface SignUpAction {
    type: typeof SIGNUP_SUCCESS | typeof SIGNUP_ERROR;
    payload?: any
}

export type SystemActionTypes = SignInInAction | SignOutAction | SignUpAction;
