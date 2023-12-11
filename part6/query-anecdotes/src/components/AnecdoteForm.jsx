import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../../requests'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () =>
{
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) =>
  {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
    { content, id: getId(), votes: 0 },
    {
      onSuccess: (data) => {
        console.log('Mutation was successful:', data);
      },
      onError: (error) => {
        console.error('Mutation failed:', error);
      },
    }
  );
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
