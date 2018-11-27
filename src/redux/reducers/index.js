import { combineReducers } from 'redux';
import PostsReducer from './fetchData.reducers';
import CreateReducer from './addData.reducers'


const rootReducer = combineReducers({
    PostsReducer,
    CreateReducer
});

export default rootReducer;