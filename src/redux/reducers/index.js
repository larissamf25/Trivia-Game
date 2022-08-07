import { combineReducers } from 'redux';
import play from './play';
import trivia from './trivia';

const rootReducer = combineReducers({
  play,
  trivia,
});

export default rootReducer;
