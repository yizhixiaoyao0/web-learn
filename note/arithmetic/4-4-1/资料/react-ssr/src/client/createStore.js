import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../share/store/reducers';

const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk));

export default store;