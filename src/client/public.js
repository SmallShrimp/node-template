/**
 * Created by Administrator on 2016/11/18.
 */
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {combineReducers, applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from 'reducer';

function createStoreWithReducer(reducer, state = {}) {
    state = !state ? {} : state;
    var store = createStore(reducer, state, applyMiddleware(thunk));
    return store;
}

function renderClient() {
    const basePath = 'pages';
    const state = window.__initialState;
    const path = window.__path;
    var store = createStoreWithReducer(reducer, state);
    var PageComponent;
    if (path == "/" || path == '') {
        PageComponent = require('pages/index').default;
    } else {
        //--> /auth/login
        PageComponent = require('pages' + path).default;
    }

    render(
        <Provider store={store}>
            <PageComponent />
        </Provider>,
        document.getElementById('view')
    );
}

renderClient();