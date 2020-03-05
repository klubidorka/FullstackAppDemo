import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";

const loadState = () => {
    try {
        const serialisedState = window.localStorage.getItem('app_state');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (err) {
        return undefined;
    }
};

const oldState = loadState();
const store = createStore(rootReducer, oldState);

const saveState = (state) => {
    try {
        window.localStorage.setItem('app_state', JSON.stringify(state));
    } catch (err) {
        
    }
};

store.subscribe(() => {
    console.log('here')
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,document.getElementById('root')
);
