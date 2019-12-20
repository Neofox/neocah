import {createStore, combineReducers, applyMiddleware, Action} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {firestoreReducer} from "redux-firestore";

import {systemReducer} from "./system/reducers";
import {gameReducer} from "./game/reducers";

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType,
    {},
    { getFirestore: any, getFirebase: any },
    Action<string>>

const rootReducer = combineReducers({
    system: systemReducer,
    game: gameReducer,
    firestore: firestoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
