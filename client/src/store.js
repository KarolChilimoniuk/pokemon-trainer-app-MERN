import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const composer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, composer);

export default store;