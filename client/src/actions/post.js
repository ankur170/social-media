import axios from 'axios'
import { GET_POSTS, GET_POST, POSTS_ERROR, UPDATE_LIKE, DELETE_POST, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from './types'
import {setAlert} from '../actions/alert'

//Get All Posts
export const getAllPosts = ()=> async (dispatch)=>{
    try{
        const res = await axios.get('/api/posts')
        //console.log('getallpost res is', res.data)
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }
    catch(err){
        //console.log('err is',err.response)
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Get  Post BY POST ID
export const getPostByPostId = (post_id)=> async (dispatch)=>{
    console.log('getpostbyid isrunning postId is', post_id)
    try{
        const res = await axios.get(`/api/posts/${post_id}`)
        console.log('getallpost res is', res.data)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }
    catch(err){
        //console.log('err is',err.response)
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// add Like
export const addLike = (post_id)=> async (dispatch)=>{
    //console.log('add like is running  ')
    try{
        const res = await axios.put(`/api/posts/like/${post_id}`)
        const data = res.data
        //console.log('addlike response is', res.data)
        dispatch({
            type: UPDATE_LIKE,
            payload: {post_id , like: data}
        })
    }
    catch(err){
        //console.log('err is',err.response)
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// add unLike
export const addUnlike = (post_id)=> async (dispatch)=>{
    try{
        const res = await axios.put(`/api/posts/unlike/${post_id}`)
        const data = res.data
        //console.log('getallpost res is', res.data)
        dispatch({
            type: UPDATE_LIKE,
            payload: {post_id , like: data}
        })
    }
    catch(err){
        //console.log('err is',err.response)
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//delete the post
export const deletePost = (post_id)=> async (dispatch)=>{
    try{
        await axios.delete(`/api/posts/${post_id}`)
        dispatch({
            type: DELETE_POST,
            payload: post_id 
        })
        dispatch(setAlert('Post Deleted', 'success'))
    }
    catch(err){
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//ADD A POST
export const addPost = (text)=> async (dispatch)=>{

    const config = {headers:{
        'Content-Type' : 'application/json'
    }}
    try{
        const res = await axios.post(`/api/posts/`, text , config)
        dispatch({
            type: ADD_POST,
            payload: res.data  
        })
        dispatch(setAlert('Post Added', 'success'))
    }
    catch(err){
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// ADD COMMENT ON POST
export const addComment = (post_id, text)=> async dispatch=>{
    const config = {headers:{
        'Content-Type' : 'application/json'
    }}
    try{
        const res = await axios.post(`/api/posts/comment/${post_id}`, text , config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data  
        })
        dispatch(setAlert('Comment Added', 'success'))
    }
    catch(err){
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
} 

// REMOVE COMMENT ON POST
export const removeComment = (post_id, comment_id)=> async dispatch=>{
    
    try{
        await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: {comment_id}  
        })
        dispatch(setAlert('Comment Added', 'success'))
    }
    catch(err){
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
} 