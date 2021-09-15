import { ADD_EDUCATION, ADD_EXPERIENCE, CLEAR_PROFILE, GET_GITHUB_REPOS, GET_PROFILE,
     GET_PROFILES,
     PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types"

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    error: {},
    isLoading: true
}

const profile = (state = initialState, action)=>{
    const {type, payload} = action
    //console.log(`before state updated and reducer is running action type is ${type} payload is  `,payload)
    switch(type){
        case GET_PROFILE:
        case ADD_EDUCATION:
        case ADD_EXPERIENCE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                isLoading:false
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                isLoading:false
            }
        case GET_GITHUB_REPOS:
            return{
                    ...state,
                    repos : payload,
                    isLoading:false
                }
        case PROFILE_ERROR:
            return{
                ...state,
                isLoading: false,
                error: payload,
                profile: null
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                isLoading:false,
                profile:null,
                repos:[]
            }
        default:
            return{
                ...state
            }
    }
}

export default profile