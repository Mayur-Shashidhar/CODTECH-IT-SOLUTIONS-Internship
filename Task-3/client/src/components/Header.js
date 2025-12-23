import React, { useState } from 'react';
import './Header.css';

function Header({ connected, documentId, currentUser, onNameChange }) {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  const handleEditName = () => {
    setTempName(currentUser?.name || '');
    setEditingName(true);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onNameChange(tempName.trim());
    }
    setEditingName(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setEditingName(false);
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="app-title">
          <span className="logo">⚡</span>
          Real-Time Collaboration Tool
        </h1>
        <div className="document-info">
          <span className="doc-label">Document:</span>
          <span className="doc-id">{documentId}</span>
        </div>
      </div>
      <div className="header-right">
        <div className="user-profile">
          {currentUser && (
            <>
              {editingName ? (
                <div className="name-edit">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={handleSaveName}
                    autoFocus
                    maxLength={20}
                    className="name-input"
                  />
                </div>
              ) : (
                <div className="user-name-display" onClick={handleEditName}>
                  <span 
                    className="user-color-dot"
                    style={{ backgroundColor: currentUser.color }}
                  />
                  <span className="user-name">{currentUser.name}</span>
                  <span className="edit-icon">✏️</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
          <div className={`status-indicator ${connected ? 'connected' : 'disconnected'}`} />
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
