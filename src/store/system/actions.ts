import {LOGIN_SUCCESS, LOGIN_ERROR, ThunkType, CredentialsType, SIGNOUT_SUCCESS} from "./types";

export function signIn(credentials: CredentialsType): ThunkType {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                })
            })
            .catch((err: any) => {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: err
                })
            });
        return;
    }

}

export function signOut(): ThunkType {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({
                type: SIGNOUT_SUCCESS
            })
        });
    }
}
