import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {productsReducer} from './store/reducer'
import App from "./App";
import * as serviceWorker from "./serviceWorker";


const middlewares = [thunk];

const store = createStore(productsReducer, applyMiddleware(...middlewares));


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
