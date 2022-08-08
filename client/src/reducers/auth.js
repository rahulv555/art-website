import {AUTH, LOGOUT} from '../constants/actionConstants'


const authReducer = (state={authData:null}, action)=>{
    switch(action.type){
        case AUTH:
            
            localStorage.setItem('profile', JSON.stringify({...action?.data})) //storing the login info in local storage
            return{...state, authData: action?.data}
        case LOGOUT:
            localStorage.clear()
            return{...state, authData: null}
        default:    
            return state
    }
}



export default authReducer