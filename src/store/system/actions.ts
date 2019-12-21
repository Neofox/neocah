import {
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SIGNUP_ERROR,
    ThunkType,
    CredentialsType,
    SIGNOUT_SUCCESS,
    NewUserType,
    SIGNUP_SUCCESS
} from "./types";
import {UserType} from "../../utils/types";

export function signIn(credentials: CredentialsType): ThunkType {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch({
                    type: SIGNIN_SUCCESS,
                })
            })
            .catch((err: any) => {
                dispatch({
                    type: SIGNIN_ERROR,
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

export function signUp(newUser: NewUserType): ThunkType {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res: any) => {
            const userStore: UserType = {
                name: newUser.name
            };
            return firestore.collection('users').doc(res.user.uid).set(userStore)
        }).then(() => {
            dispatch({type: SIGNUP_SUCCESS})
        }).catch((err: any) => {
            dispatch({
                type: SIGNUP_ERROR,
                payload: err
            })
        });
    }
}
