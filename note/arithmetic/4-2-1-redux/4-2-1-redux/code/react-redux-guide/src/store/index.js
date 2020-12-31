import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/root.reducer";
// import thunk from 'redux-thunk';
// import logger from "./middleware/logger";
// import test from "./middleware/test";
// import thunk from './middleware/thunk';
import createSagaMidddleware from 'redux-saga';
import rootSaga from './sagas/root.saga';

// 创建 sagaMiddleware
const sagaMiddleware = createSagaMidddleware();

export const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

// 启动 counterSaga
sagaMiddleware.run(rootSaga)
