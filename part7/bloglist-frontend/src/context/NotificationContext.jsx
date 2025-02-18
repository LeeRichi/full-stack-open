import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const initialState = { notification: null };

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { notification: { message: action.payload.message, type: action.payload.type } };
    case 'CLEAR_NOTIFICATION':
      return { notification: null };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const setErrorMessage = (message, type) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } });
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification: state.notification, setErrorMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
