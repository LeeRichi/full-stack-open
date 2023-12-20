import React, { useEffect } from 'react';

interface NotificationProps {
  notification: string;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const Notification: React.FC<NotificationProps> = ({ notification, setNotification }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNotification('');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [notification, setNotification]);

  return (
    <div style={{ color: 'red' }}>{notification}</div>
  );
}

export default Notification;
