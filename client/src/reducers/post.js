import { ADD_POST, DELETE_POST, GET_POSTS, GET_POST, POSTS_ERROR ,UPDATE_LIKE, ADD_COMMENT, REMOVE_COMMENT, CLEAR_POST} from "../actions/types";

const initialState = {
    posts : [],
    isLoading: true,
    error:{},
    post:null
}

const post = (state = initialState, action)=>{
    const {type, payload}= action
    switch(type){
        case GET_POSTS:
            return{
                ...state,
                isLoading:false,
                posts:payload
            }
        case GET_POST:
            return{
                ...state,
                isLoading:false,
                post:payload
            }
        case ADD_POST:
            return{
                ...state,
                isLoading: false,
                posts: [ payload, ...state.posts]
            }
        case DELETE_POST:
            return{
                ...state,
                isLoading:false,
                posts: state.posts.filter((post)=> post._id !== payload)
            }
        case POSTS_ERROR:
            return{
                ...state,
                error: payload,
                isLoading:false,
                post: null
            }
        case CLEAR_POST:
            return{
                ...state,
                posts: [],
                post:null,
                isLoading:false
            }
        case UPDATE_LIKE:
            return{
                ...state,
                posts: state.posts.map((post)=> post._id === payload.post_id ? 
                {...post, like: payload.like} : post ),
                isLoading: false
            }
        case ADD_COMMENT:
            return{
                ...state,
                post: {...state.post, comment: payload},
                isLoading: false
            }
        case REMOVE_COMMENT:
            return{
                ...state,
                post: {...state.post, comment: state.post.comment.filter((comm)=> comm._id !== payload.comment_id)},
                isLoading: false
            }
        default:
            return state
    }
}

export default post