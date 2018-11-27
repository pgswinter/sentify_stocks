import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
// import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../redux/reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState){
    const finalCreateStore = compose(
        applyMiddleware(loggerMiddleware, promise),
    )(createStore);
    const store = finalCreateStore(rootReducer, initialState);
    
    return store;
}