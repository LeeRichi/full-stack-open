import { configureStore } from '@reduxjs/toolkit'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer.js'
import blogReducer from './reducers/blogReducer.js'
import userReducer from './reducers/userReducer.js'

const store = configureStore({
  reducer: {
		// anecdotes: anecdoteReducer,
		// filter: filterReducer,
		notification: notificationReducer,
		blogs: blogReducer,
		user: userReducer
  }
})

export default store
