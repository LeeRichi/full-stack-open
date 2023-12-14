import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action)
    {
      const idToVote = action.payload.id;
      const anecdote = state.find((a) => a.id === idToVote);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    appendAnecdote(state, action)
    {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
    removeAnecdote(state, action)
    {
      const idToRemove = action.payload;
      return state.filter(anecdote => anecdote.id !== idToRemove);
    },
  }
})

export const { vote, appendAnecdote, setAnecdote, removeAnecdote } = anecdoteSlice.actions;

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content =>
{
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const deleteAnecdote = id =>
{
  return async dispatch => {
    try {
      await anecdoteService.deleteOne(id);
      dispatch(removeAnecdote(id));
    } catch (error) {
      console.error('An error occurred while deleting the anecdote:', error);
    }
  };
};

export const updateAnecdote = (id, obj) =>
{
  const newObj = {
    content: obj.content,
    id: obj.id,
    votes: obj.votes + 1
  }
  
  return async dispatch =>
  {
    const newAnecdote = await anecdoteService.updateOne(id, newObj)
    dispatch(vote(newAnecdote))
  }
}

export default anecdoteSlice.reducer;