import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const userSlice = createSlice({
  name: 'user',
	initialState:
		null,
  reducers: {
		setUser(state, action)
		{
			return action.payload
		},
	}
})

export const storeLoggedInUser = ({username, password}) => {
	return async dispatch =>
	{
		try
		{
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
			dispatch(setUser(user))
		} catch (error)
		{
			dispatch(setNotification(`Error logging in: ${error.message}`, 'error', 5));
		}
	}
};

export const { setUser } = userSlice.actions
export default userSlice.reducer

