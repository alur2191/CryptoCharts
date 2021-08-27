import {SET_LOADING, GET_COIN} from "../types"

export default (state,action) => {
    switch(action.type){
        case GET_COIN:
            return {
                ...state, 
                coin: action.payload,
                fetching: false
            };
        case SET_LOADING:
            return {
                ...state,
                fetching:true
            }
        default:
            return state;
    }
}