import { combineReducers } from 'redux';
import userReducer from './user.reducer';

// {user: []}
export default combineReducers({
  user: userReducer
});