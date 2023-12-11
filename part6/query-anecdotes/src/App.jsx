import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updatingVote } from '../requests'
import NotificationContext from '../NotificationContext'
import { useReducer } from 'react'
import notificationReducer from '../NotificationContext'
import { useNotificationDispatch, useNotificationValue } from '../NotificationContext'

const App = () =>
{
  const queryClient = useQueryClient()
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch()

  const newVoteMutation = useMutation({
    mutationFn: updatingVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  
  const handleVote = async(anecdote) => {
    newVoteMutation.mutate(anecdote)
    await dispatch({ type: 'success', payload: `${anecdote.content} voted` })
    setTimeout(() => {
      dispatch({ type: 'success', payload: '' }); // Clear the message
      console.log('Message cleared');
    }, 5000);
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
