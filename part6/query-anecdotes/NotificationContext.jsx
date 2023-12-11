import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return { message: action.payload };
    case 'fail':
      return { message: 'too short anecdote' };
    default:
      return state;
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: '' });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationValue must be used within a NotificationContextProvider");
  }
  return context[0];
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationDispatch must be used within a NotificationContextProvider");
  }
  return context[1];
}

export default NotificationContext