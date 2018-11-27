import {statusConstant} from "../_constant";

const INITIAL_STATE = {
    gotValues:{
        _values: [],
        error:null,
        loading: true
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case(statusConstant.FETCH_POSTS_REQUEST):
            return {
                ...state,
                gotValues:{
                    _values:[],
                    error:null,
                    loading: true
                }
            }
        case(statusConstant.FETCH_POSTS_SUCCESS):
            return {
                ...state,
                gotValues:{
                    _values:action.payload,
                    error:null,
                    loading: false
                }
            }
        case(statusConstant.FETCH_POSTS_FAILURE): error = action.payload || {message: action.payload.message};
            return{
                ...state,
                gotValues:{
                    _values:[],
                    error: error,
                    loading: false
                }
            }
        case(statusConstant.RESET_POSTS):
            return {
                ...state,
                gotValues:{
                    _values:[],
                    error: null,
                    loading: false
                }
            }
        default:
            return state;
    }
}