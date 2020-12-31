import { INCREMENT, DECREMENT } from "../const/counter.const";

const initialState = {
  count: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.payload
      }
    case DECREMENT:
      return {
        ...state,
        count: state.count - action.payload
      }
    default: 
      return state;
  }
}