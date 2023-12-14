import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () =>
{
    const dispatch = useDispatch()

    const addNew = async(event) => {
        event.preventDefault()
        const content = event.target.new.value
        event.target.new.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addNew}>
            <div><input name='new'/></div>
            <button type='submit'>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm