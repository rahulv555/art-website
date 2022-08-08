import * as api from '../api' //to import everything
import { GET_AUTHOR, GET_POSTS_BY_AUTHOR, START_LOADING, STOP_LOADING, UPDATE_AUTHOR } from '../constants/actionConstants';

export const getAuthor = (id)=>async(dispatch)=>{    //redux-thunk syntax
    
    try{

        //to start loading 
        dispatch({type: START_LOADING})
        const {data} = await api.getAuthor(id);
       // console.log(data)
        const action = {type: GET_AUTHOR, payload: data}
        dispatch(action)  //goes to reducer
        //to stop loading
        dispatch({type: STOP_LOADING})

    }catch(error){
        console.log(error)
    }
    
}



export const getPostsByAuthor = (id)=>async(dispatch)=>{    //redux-thunk syntax
    
    try{

        //to start loading 
        dispatch({type: START_LOADING})
        const {data} = await api.getPostsByAuthor(id);
        //console.log(data)
        const action = {type: GET_POSTS_BY_AUTHOR, payload: data}
        dispatch(action)  //goes to reducer
        //to stop loading
        dispatch({type: STOP_LOADING})

    }catch(error){
        console.log(error)
    }
    
}



export const updateAuthor = (id, author, navigate)=>async(dispatch)=>{

    try {
        //to start loading 
        dispatch({type: START_LOADING})
        const {data} = await api.updateAuthor(id, author) //returns updated post
        navigate(`/author/${data._id}`)
        const action = {type: UPDATE_AUTHOR, payload:data}
        dispatch(action)


        //to stop loading
        dispatch({type: STOP_LOADING})
        
    } catch (error) {
        console.log(error)
        
    }
    
}