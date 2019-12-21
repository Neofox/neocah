import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from "./store";
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebaseConfig from './config/firebase';
import rrfConfig from './config/react-redux-firebase';
import {createFirestoreInstance} from "redux-firestore";
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

const store = configureStore();

const AuthIsLoaded = (props: any) => {
    const auth = useSelector((state: any) => state.firebase.auth);
    if (!isLoaded(auth)) return <div>loading...</div>;
    return props.children
}

const Root = () => (
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={firebaseConfig}
            config={rrfConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
        >
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
