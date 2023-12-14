import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action)
    {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userLogin = (username, password) =>
{
    const credentials = { username, password }
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
                
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

            blogService.setToken(user.token)

            dispatch(setUser(user))
        } catch (exception)
        {
            
        }
    }
}

export const userLogout = () =>
{
    window.localStorage.clear();
    return async dispatch =>
    {
        dispatch(setUser(''))
    }
}

export default userSlice.reducer;
