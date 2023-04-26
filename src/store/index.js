import {createStore} from 'redux';
import reducers from '../reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => {
    return createStore(reducers, applyMiddleware(thunk));
}

export default configureStore;