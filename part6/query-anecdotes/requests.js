import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async (newAnecdote) => {
  try
  {
    const response = await axios.post(baseUrl, newAnecdote);
    return response.data;
  } catch (error) {
    console.error('An error occurred while creating anecdote:', error);
    throw error;
  }
};

export const updatingVote = async (obj) =>
{
  const newObj = {
    content: obj.content,
    id: obj.id,
    votes: obj.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${obj.id}`, newObj)
  return response.data;
}