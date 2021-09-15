import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//USER LOAD ACTION
export const loadUser = ()=> async dispatch =>{
    const token = localStorage.getItem('token')
    if(token){
        setAuthToken(token)
    }

    try{
        const res = await axios.get('/api/auths/')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//REGISTER USER ACTION
export const register = ({name, email, passWord})=> async (dispatch)=>{
    const config = {headers:{
        'Content-Type': 'application/json'
    }} 
    
    const body = JSON.stringify({name, email, passWord})

    try{
        const res = await axios.post('/api/users', body, config)
        console.log(res)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }
    catch(err){
        console.log(err)
        const errors= err.response.data.errors
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger'))
            );
        }
        
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//LOGIN USER ACTION
export const login = ({ email, passWord})=> async (dispatch)=>{
    const config = {headers:{
        'Content-Type': 'application/json'
    }} 
    
    const body = JSON.stringify({ email, passWord})

    try{
        const res = await axios.post('/api/auths', body, config)
        //console.log(res)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }
    catch(err){
        console.log(err)
        const errors= err.response.data.error
        if(errors){
            errors.forEach(errs => dispatch(setAlert(errs.msg, 'danger'))
            );
        }
        
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//LOGOUT ACTION
export const logout = ()=> dispatch =>{
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
}