import transactionsreducer from './transactionsreducer'
import { combineReducers } from 'redux'
const appReducers = combineReducers({
  transactionsreducer: transactionsreducer
})
const reducers = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }
  return appReducers(state, action);
};
export default reducers;