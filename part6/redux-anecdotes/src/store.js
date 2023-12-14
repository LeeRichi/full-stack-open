import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer'
// import anecdoteService from './services/anecdotes'
// import { setAnecdote } from './reducers/anecdoteReducer';

const store = configureStore({
  reducer: rootReducer,
});

// anecdoteService.getAll().then(anecdotes => 
//   store.dispatch(setAnecdote(anecdotes))
// )

export default store;
