import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types, no-unused-vars
const Notification = ({createdMessage }) =>
{
    console.log(createdMessage)
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (createdMessage) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [createdMessage]);

    const notificationStyle = {
        color: 'green',
        display: isVisible ? 'block' : 'none',
        fontSize: '32px'
    }
  return (
      <div style={notificationStyle}>
        {createdMessage}
      </div>
  )
}

export default Notification;