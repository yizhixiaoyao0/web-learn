import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

function enhancer(createStore) {
  return function(reducer, preloadedState) {
    var store = createStore(reducer, preloadedState);
    var dispatch = store.dispatch;
    function _dispatch(action) {
      if (typeof action === 'function') {
        return  action(dispatch);
      }
      dispatch(dispatch);
    }
    return {
      ...store,
      dispatch: _dispatch
    };
  }
}


function createStore(reducer, preloadedState, enhancer) {

  if (typeof reducer !== 'function') throw new Error('reducer必须是函数')

  if (enhancer !== undefined) {

    if (typeof enhancer !== 'function') {
      throw new Error('enhancer 必须是函数');
    }

    return enhancer(createStore)(reducer, preloadedState);

  }

  var currentState = preloadedState;
  var currentListeners = [];


  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    for(var i = 0; i < currentListeners.length;i++) {
      var listener = currentListeners[i];
      listener();
    }
  }

  function subscribe(listener) {
    currentListeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}


