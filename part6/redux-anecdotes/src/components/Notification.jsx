import { useSelector, useDispatch } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'

const Notification = () =>
{
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch();

  if (notification === null) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  setTimeout(() => {
    dispatch(setNotification(null));
  }, 5000);

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification