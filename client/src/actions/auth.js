import * as api from '../api/index.js' //to import everything
import { AUTH, START_LOADING, STOP_LOADING} from '../constants/actionConstants';


export const signin = (formData, navigate)=>async(dispatch)=>{
    try {
        //to start loading 
        dispatch({type: START_LOADING})
        
        const{data} = await api.signIn(formData)    
        
        dispatch({type: AUTH,  data})
        
        navigate('/');
        //to stop loading
        dispatch({type: STOP_LOADING})

    } catch (error) {
        console.log(error)
    }

}


export const signup = (formData, navigate)=>async(dispatch)=>{
    try {
            //to start loading 
        dispatch({type: START_LOADING})
        
        const{data} = await api.signUp(formData)    

        dispatch({type: AUTH,  data})
        
        navigate('/');
        //to stop loading
        dispatch({type: STOP_LOADING})

    } catch (error) {
        console.log(error)
    }

}