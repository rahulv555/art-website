import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'
import author from './author'

export default combineReducers({
    posts,auth,author

})