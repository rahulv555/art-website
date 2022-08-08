//reducer is a function that accepts the state and the action
//based on action, the logic is applied
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST, FETCH_BY_SEARCH ,START_LOADING, STOP_LOADING, FETCH_POST, COMMENT } from '../constants/actionConstants';

//state = posts,
const reducer = (state= {isLoading : true, posts : [], post : null}, action)=>{  //[] initial value 
    switch (action.type){
        case FETCH_ALL:
            return {...state, posts:action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages}
        case FETCH_BY_SEARCH:
            return {...state, posts:action.payload}
        case FETCH_POST:
            return {...state, post: action.payload}
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]}; //adding to posts
        case UPDATE:
            return {...state, posts: state.posts.map((post)=>post._id===action.payload._id?action.payload:post)}
        case DELETE:
            return {...state, posts: state.posts.filter((post)=>post._id!==action.payload)}
        case LIKE_POST:
             return {...state, posts: state.posts.map((post)=>post._id===action.payload._id?action.payload:post)}
        case COMMENT:
            return {...state, posts: state.posts.map((post)=>{if(post._id===action.payload._id)return action.payload; return post})}
            // 
        case START_LOADING:
            return {...state, isLoading: true}
        case STOP_LOADING:
            return {...state, isLoading: false}
        default:
            return state;


    }

}

export default reducer  //to combinee reducers  