import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types, no-unused-vars
const Notification = ({createdMessage, errMessage }) =>
{
    const [isVisible, setIsVisible] = useState(false);
    const [isErrMessage, setIsErrMessage] = useState(false);

    useEffect(() => {
        if (createdMessage || errMessage) {
            setIsVisible(true);
            if (errMessage)
            {
                setIsErrMessage(true)
            }

            const timer = setTimeout(() => {
                setIsVisible(false);
                setIsErrMessage(false)
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [createdMessage, errMessage]);

    const notificationStyle = {
        color: isErrMessage ? 'red' : 'green',
        display: isVisible ? 'block' : 'none',
        fontSize: '32px'
    }
  return (
      <div style={notificationStyle}>
        {createdMessage || errMessage}
      </div>
  )
}

export default Notification;