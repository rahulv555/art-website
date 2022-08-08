import * as api from '../api' //to import everything
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE_POST, START_LOADING, STOP_LOADING, FETCH_POST, COMMENT } from '../constants/actionConstants';

//Action Creators - function that return actions
export const getPosts = (page)=>async(dispatch)=>{    //redux-thunk syntax
    
    try{

        //to start loading 
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);
        const action = {type: FETCH_ALL, payload: data}
        dispatch(action)  //goes to reducer
        //to stop loading
        dispatch({type: STOP_LOADING})

    }catch(error){
        console.log(error)
    }
    
}



export const getPostsBySearch = (searchQuery)=>async(dispatch)=>{
    try {
        //to start loading 
        dispatch({type: START_LOADING})
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        const action = {type:FETCH_BY_SEARCH, payload: data}
        dispatch(action)
         //to stop loading
         dispatch({type: STOP_LOADING})

    } catch (error) {
        console.log(error)
    }

}

export const getPost = (id)=>async(dispatch)=>{    //redux-thunk syntax
    
    try{

        //to start loading 
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPost(id);
        const action = {type: FETCH_POST, payload: data}
        dispatch(action)  //goes to reducer
        //to stop loading
        dispatch({type: STOP_LOADING})

    }catch(error){
        console.log(error)
    }
    
}




export const createPost = (post, navigate)=>async(dispatch)=>{
    try {
            //to start loading 
            dispatch({type: START_LOADING})
        const {data} = await api.createPost(post);
        navigate(`/posts/${data._id}`)
        const action = {type: CREATE, payload: data}
        dispatch(action)
        //to stop loading
        dispatch({type: STOP_LOADING})

    } catch (error) {
        console.log(error)
    }
}




export const updatePost = (id, post, navigate)=>async(dispatch)=>{
    try{
        
        const {data} = await api.updatePost(id, post) //returns updated post
        navigate(`/posts/${data._id}`)
        const action = {type: UPDATE, payload:data}
        dispatch(action)

    }catch(error){
        console.log(error)
    }
}


export const deletePost = (id)=>async(dispatch)=>{
    try{
        //to start loading 
        dispatch({type: START_LOADING})
        await api.deletePost(id)
        const action = {type:DELETE, payload: id}
        dispatch(action)
        //to start loading 
        dispatch({type: STOP_LOADING})
    }catch(error){
        console.log(error)
    }
}


export const likePost = (id)=>async(dispatch)=>{
    try {
        const {data} = await api.likePost(id) //returns updated post
        const action = {type: LIKE_POST, payload:data}
        dispatch(action)

        
    } catch (error) {
        console.log(error)
    }
}



export const commentPost = (comment, id) =>async(dispatch)=>{
    try {
        const {data} = await api.comment(comment, id)
        const action = {type: COMMENT, payload:data}
        dispatch(action);

        return data.comments; //returning the newest comments

    } catch (error) {
        console.log(error)
    }
}