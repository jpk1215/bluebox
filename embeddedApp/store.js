import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);

const configureStore = initialState => createStoreWithMiddleware(reducer, initialState);

export default configureStore;
