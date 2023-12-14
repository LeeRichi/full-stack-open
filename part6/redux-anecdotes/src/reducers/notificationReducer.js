import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) =>
    {
      return action.payload;
    },
  },
});

// export const { setNotification } = notificationSlice.actions;

export const setNotification = (message, duration) => {
  return (dispatch) => {

    if (!duration)
    {
      return
    }
    dispatch(notificationSlice.actions.setNotification(`${message} ${duration}`));

    const intervalId = setInterval(() => {
      duration -= 1;
      dispatch(notificationSlice.actions.setNotification(`${message} ${duration}`));

      if (duration === 0) {
        clearInterval(intervalId);
        dispatch(notificationSlice.actions.setNotification(null));
      }
    }, 1000);
    

    // setTimeout(() => {
    //   dispatch(notificationSlice.actions.setNotification(null));
    // }, duration * 1000);
  };
};

export default notificationSlice.reducer;