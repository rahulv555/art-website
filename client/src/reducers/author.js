import {GET_AUTHOR, GET_POSTS_BY_AUTHOR, UPDATE_AUTHOR} from '../constants/actionConstants'


const authorReducer = (state={author:null, posts:[]}, action)=>{
    switch(action.type){
        case GET_AUTHOR:
            return {...state, author:action.payload}
        case GET_POSTS_BY_AUTHOR:
            return {...state, posts:action.payload}
        case UPDATE_AUTHOR:
            return {...state, author:action.paylod}
        default:    
            return state
    }
}



export default authorReducer