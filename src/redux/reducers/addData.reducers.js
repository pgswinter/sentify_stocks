import {createConstant} from "../_constant";

const INITIAL_STATE = {
    newPost:{
        post:null,
        error: null,
        loading: true
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case(createConstant.CREATE_POST):
            return {
                ...state,
                newPost:{
                    ...state.newPost,
                    loading: true
                }
            }
        case(createConstant.CREATE_POST_SUCCESS):
            return {
                ...state,
                newPost:{
                    post:action.payload,
                    error:null,
                    loading: false
                }
            }
        case(createConstant.CREATE_POST_FAILURE): error = action.payload || {message: action.payload.message};
            return{
                ...state,
                newPost:{
                    post:null,
                    error: error,
                    loading: false
                }
            }
        case(createConstant.RESET_NEW_POST):
            return {
                ...state,
                newPost:{
                    post:null,
                    error: null,
                    loading: false
                }
            }
        default:
            return state;
    }
}