import { SET_ALERT,REMOVE_ALERT } from "../actions/types";

const initialState = []

const alert = (state = initialState, action)=>{
    switch(action.type){
        case SET_ALERT:
            return [...state, action.payload]
        case REMOVE_ALERT:
            return state.filter((eachAlert)=> eachAlert.id !== action.payload)
        default:
            return state
    }
}

export default alert