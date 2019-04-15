import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { install, StoreCreator } from 'redux-loop';
import { reducer, initialState } from './store/sermons/reducer'
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = (createStore as StoreCreator)(reducer, initialState, install())

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
