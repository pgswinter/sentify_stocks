import axios from 'axios';
import {statusConstant,apiUrl} from "../_constant";

export function createPost(props) {
    const request = axios({
      method: 'post',
      data: props,
      url: apiUrl.ROOT_URL
    });
  
    return {
      type: statusConstant.CREATE_POST,
      payload: request
    };
  }
  
  export function createPostSuccess(newPost) {
    return {
      type: statusConstant.CREATE_POST_SUCCESS,
      payload: newPost
    };
  }
  
  export function createPostFailure(error) {
    return {
      type: statusConstant.CREATE_POST_FAILURE,
      payload: error
    };
  }
  
  export function resetNewPost() {
    return {
      type: statusConstant.RESET_NEW_POST
    }
  }