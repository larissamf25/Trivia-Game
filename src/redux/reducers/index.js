import { combineReducers } from 'redux';
import play from './play';
import user from './user';

const rootReducer = combineReducers({
  play,
  user,
});

export default rootReducer;
