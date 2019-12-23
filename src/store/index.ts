import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {firestoreReducer, getFirestore} from "redux-firestore";
import {firebaseReducer, getFirebase} from "react-redux-firebase";
import {systemReducer} from "./system/reducers";
import {gameReducer} from "./game/reducers";

const rootReducer = combineReducers({
    system: systemReducer,
    game: gameReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware.withExtraArgument({getFirebase, getFirestore})];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
