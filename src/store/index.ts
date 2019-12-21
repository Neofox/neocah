import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {firestoreReducer} from "redux-firestore";
import {firebaseReducer, getFirebase} from "react-redux-firebase";
import {systemReducer} from "./system/reducers";

const rootReducer = combineReducers({
    system: systemReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware.withExtraArgument({getFirebase})];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
