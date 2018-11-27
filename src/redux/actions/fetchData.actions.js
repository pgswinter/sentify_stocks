import axios from 'axios';
import {statusConstant,apiUrl} from "../_constant";

export function fetchPosts(){
    const request = axios({
        method: 'get',
        url: apiUrl.ROOT_URL,
        header: []
    });

    return {
        type: statusConstant.FETCH_POSTS_REQUEST,
        payload: request
    }
}

export function fetchPostsSuccess(data){
    return {
        type: statusConstant.FETCH_POSTS_SUCCESS,
        payload: data
    }
}

export function fetchPostsFailure(error) {
    return {
      type: statusConstant.FETCH_POSTS_FAILURE,
      payload: error
    };
  }