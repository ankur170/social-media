import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: true,
    user: null
}

const auth = (state = initialState, action)=>{
    const {type, payload} = action

    switch(type){
        case USER_LOADED:
            return({
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:payload
            })
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return({
                ...state,
                isAuthenticated:true,
                isLoading:false,
                ...payload
            })
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return({
                ...state,
                isLoading:false,
                isAuthenticated:false,
                token:null
            })
        default:
            return state
    }
}

export default auth