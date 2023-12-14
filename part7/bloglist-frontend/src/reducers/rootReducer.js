import { combineReducers } from 'redux';
import blogReducer from './blogReducer'
import userReducer from './userReducer';

const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer
});

export default rootReducer;
