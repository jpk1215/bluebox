import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
)(createStore);

configureStore = initialState => createStoreWithMiddleware(reducer, initialState);

export default configureStore;