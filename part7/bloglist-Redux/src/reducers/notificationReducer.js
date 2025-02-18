import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
	initialState:
		null,
	// {
	// 	message: null,
	// 	type: null
	// },
  reducers: {
		showNotification(state, action)
		{
			return { message: action.payload.message, type: action.payload.type };
		},
		hideNotification()
		{
			return null
		}
	}
})

export const setNotification = (message, type, timeout) =>
{
	return dispatch =>
	{
		dispatch(showNotification({ message, type }))
		setTimeout(() => {
			dispatch(hideNotification())
		}, timeout * 5000)
	}
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

