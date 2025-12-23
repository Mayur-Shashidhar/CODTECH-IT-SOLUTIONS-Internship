import React from 'react';
import './UserList.css';

function UserList({ users, currentUser }) {
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h3>👥 Active Users</h3>
        <span className="user-count">{users.length}</span>
      </div>
      <div className="user-list">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`user-item ${user.id === currentUser?.id ? 'current-user' : ''}`}
          >
            <div 
              className="user-indicator"
              style={{ backgroundColor: user.color }}
            />
            <div className="user-details">
              <span className="user-name">
                {user.name}
                {user.id === currentUser?.id && ' (You)'}
              </span>
              <span className="user-cursor">
                Cursor: {user.cursorPosition || 0}
              </span>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="no-users">
            No active users
          </div>
        )}
      </div>
      <div className="user-list-footer">
        <div className="info-text">
          💡 Multiple users can edit simultaneously
        </div>
      </div>
    </div>
  );
}

export default UserList;
