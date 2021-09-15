import axios  from "axios";
import { setAlert } from "./alert";

import { ACCOUNT_DELETED, ADD_EDUCATION, ADD_EXPERIENCE, CLEAR_PROFILE, GET_PROFILE,
        GET_GITHUB_REPOS, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

//GET CURRENT USER  PROFILE
export const getCurrentProfile = ()=> async (dispatch)=>{
    try{
        const res = await axios.get('api/profiles/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data 
        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//GET ALL USERS PROFILE
export const getAllProfiles = ()=> async dispatch=>{
    dispatch({
        type: CLEAR_PROFILE
    })
    try{
        const res = await axios.get('/api/profiles/')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//GET  USER  PROFILE BY GIVEN USER_ID
export const getProfilesByUserId = (user_id)=> async dispatch=>{
    try{
        const res = await axios.get(`/api/profiles/user/${user_id}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//GET  GITHUB REPOS BY GIVEN USER_NAME
export const getGithubRepos = (user_name)=> async dispatch=>{
    try{
        const res = await axios.get(`/api/profiles/github/${user_name}`)
        dispatch({
            type: GET_GITHUB_REPOS,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


//CREATE AND UPDATE CURRENT USER PROFILE
export const createCurrentProfile = (formData, history, edit = false)=> async(dispatch)=>{

    const config = {Headers:{
        'Content-Type': 'application/json'
    }}
    //console.log('form sending data',formData)
    //const body = JSON.stringify(formData)
    try{
        const res = await axios.post('/api/profiles', formData, config)
        //console.log('response of profilecreate',res.data)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'))
        if(!edit){
            history.push('/dashboard')
        }
    }
    catch(err){
        const error = err.response.data.errors
        error.map((errs)=> dispatch(setAlert(errs.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

//ADD NEW EXPERIENCE TO THE PROFILE OF CURRENT USER AND UPDATE PROFILE

export const addExperience = (formData, history)=> async dispatch=>{
        const config = {Headers:{
            'Content_type': 'application/json'
        }}
        try{
            const res = await axios.put('/api/profiles/experience', formData, config)
            dispatch({
                type: ADD_EXPERIENCE,
                payload: res.data
            })
            
            dispatch(setAlert('Experience added successfully','success'))
            history.push('/dashboard')
        }
        catch(err){
            const error = err.response.data.errors
            error.map((errs)=> dispatch(setAlert(errs.msg, 'danger')))
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }

    export const addEducation = (formData, history)=> async dispatch=>{
        const config = {Headers:{
            'Content_type': 'application/json'
        }}
        try{
            //console.log(`BEFORE ADD EDUCATION API SERVER REQ is SEND `)
            const res = await axios.put('/api/profiles/education', formData, config)
            //console.log('res from server is', res.data)
            dispatch({
                type: ADD_EDUCATION,
                payload: res.data
            })
            //console.log(`after ADD EDUCATION Action is dispatched  payload is ${res.data} `)
            dispatch(setAlert('Education added successfully','success'))
            history.push('/dashboard')
        }
        catch(err){
            const error = err.response.data.errors
            error.map((errs)=> dispatch(setAlert(errs.msg, 'danger')))
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }

// DELETE PROFILE EXPERIENCE WITH GIVEN EXPERIENCE_ID 

export const deleteExperience = (id)=> async dispatch=>{
    try{
        const res = await axios.delete(`/api/profiles/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Deleted Successfully'))
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//DELETE PROFILE EDUCATION WITH GIVEN EDUCATION_ID
export const deleteEducation = (id)=> async dispatch=>{
    try{
        const res = await axios.delete(`/api/profiles/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Deleted Successfully'))
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//DELETE ACCOUNT PERMANENTLY
export const deleteAccount = ()=> async dispatch=>{
    if(window.confirm('Your Account will Permanently DELETED YOU WILL LOOSE ALL YOUR DATA ')){
        try{
            await axios.delete('/api/profiles/')
            dispatch({type: CLEAR_PROFILE})
            dispatch({type: ACCOUNT_DELETED})
            dispatch(setAlert('ACCOUNT HAS BEEN PERMANENTLY DELETED','danger'))
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}