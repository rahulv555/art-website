// here, the react app is conned to the server index.js

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

//initiising redux
import { Provider } from 'react-redux'
//Provider keeps track of the store(global state) and allows to access it from anywhere
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import './index.css'

//reducers
import reducers from './reducers'


const store = createStore(reducers, compose(applyMiddleware(thunk)))



ReactDOM.render(
    <Provider store = {store}>  
        <App />
    </Provider>
    , document.getElementById('root')) //connect the REACT part to the element with id of root