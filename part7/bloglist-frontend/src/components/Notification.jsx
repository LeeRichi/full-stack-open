import React from 'react'

const Notification = ({ notification }) => {
	if (!notification) return null

	 const styles = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
    color: notification.type === 'success' ? '#155724' : '#721c24',
    border: notification.type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
  }

  return (
		<div style={styles}>
			{ notification.message }
    </div>
  )
}

export default Notification
