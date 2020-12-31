import { combineReducers } from 'redux';
import CounterReducer from './counter.reducer';
import ModalReducer from './modal.reducer';

// { counter: { count: 0 }, model: { show: false } }
export default combineReducers({
  counter: CounterReducer,
  modal: ModalReducer
})