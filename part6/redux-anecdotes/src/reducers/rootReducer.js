import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  anecdote: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
});

export default rootReducer;
