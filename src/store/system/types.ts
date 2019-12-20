export interface SystemState {
    loggedIn: boolean;
    user: UserType | undefined;
}
export interface UserType {
    name: string;
    inGame: boolean|string;
}

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_USER = "UPDATE_USER";

interface LogInAction {
    type: typeof LOG_IN;
    payload: UserType;
}
interface LogOutAction {
    type: typeof LOG_OUT;
}
interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: UserType;
}

export type SystemActionTypes = LogInAction | LogOutAction | UpdateUserAction;
