import { useSelector, useDispatch } from 'react-redux'
import { deleteAnecdote, updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () =>
{
    const dispatch = useDispatch()

    const anecdotes = useSelector(state =>
    {
        const sortedAnecdotes = state.anecdote.slice().sort((a, b) => b.votes - a.votes);

        if ( state.filter === 'ALL' ) {
            return sortedAnecdotes
        }

        return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    console.log(anecdotes)
    
    const OnVote = (anecdote) =>
    {
        dispatch(updateAnecdote(anecdote.id, anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    const OnDelete = (id) =>
    {
        dispatch(deleteAnecdote(id))
    }

    return (
        <>
            {anecdotes.map(anecdote => 
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => OnVote(anecdote)}>vote</button>
                        <button onClick={() => OnDelete(anecdote.id)}>delete</button>
                    </div>
                </div>
            )}
        </>    
    )
}

export default AnecdoteList