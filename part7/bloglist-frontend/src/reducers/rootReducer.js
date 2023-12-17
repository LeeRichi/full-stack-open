import { combineReducers } from 'redux';
import blogReducer from './blogReducer'
import userReducer from './userReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  users: usersReducer
});

export default rootReducer;
