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

export const signIn = (credentials: CredentialsType): ThunkType => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            dispatch({type: SIGNIN_SUCCESS,})
        } catch(err) {
            dispatch({type: SIGNIN_ERROR, payload: err})
        }
    }
};

export function signOut(): ThunkType {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        await firebase.logout(); //await firebase.auth().signOut();
        dispatch({
            type: SIGNOUT_SUCCESS
        })
    }
};

export const signUp = (newUser: NewUserType): ThunkType => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            const userStore: UserType = {
                name: newUser.name,
                currentGame: null,
                favoriteDecks: [],
                ready: false
            };
            await firestore.collection('users').doc(res.user.uid).set(userStore);
            dispatch({type: SIGNUP_SUCCESS})
        } catch (err) {
            dispatch({type: SIGNUP_ERROR, payload: err})
        }
    }
};

export const putUserInGame =  (userId: string, game: any): ThunkType<Promise<void>> => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        return firestore.collection('users').doc(userId).update({
            currentGame: game.id
        })
    }
};
