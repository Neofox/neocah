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

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={firebaseConfig}
            config={rrfConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
        >
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
