import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Editor from './components/Editor';
import UserList from './components/UserList';
import Header from './components/Header';

function App() {
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [documentId] = useState('default');
  const wsRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to server');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleMessage(data);
    };

    ws.onclose = () => {
      console.log('Disconnected from server');
      setConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleMessage = (data) => {
    switch(data.type) {
      case 'init':
        setContent(data.content);
        setCurrentUser(data.users.find(u => u.id === data.userId));
        setUsers(data.users);
        break;

      case 'content-update':
        setContent(data.content);
        break;

      case 'user-joined':
        setUsers(prev => [...prev, data.user]);
        break;

      case 'user-left':
        setUsers(prev => prev.filter(u => u.id !== data.userId));
        break;

      case 'user-info-update':
        setUsers(prev => prev.map(u => 
          u.id === data.user.id ? data.user : u
        ));
        break;

      case 'cursor-update':
        setUsers(prev => prev.map(u => 
          u.id === data.userId ? { ...u, cursorPosition: data.position } : u
        ));
        break;

      case 'document-changed':
        setContent(data.content);
        setUsers(data.users);
        break;

      default:
        break;
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'content-change',
        content: newContent
      }));
    }
  };

  const handleCursorChange = (position) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'cursor-position',
        position: position
      }));
    }
  };

  const handleNameChange = (newName) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'user-info',
        name: newName
      }));
      setCurrentUser(prev => ({ ...prev, name: newName }));
    }
  };

  return (
    <div className="App">
      <Header 
        connected={connected}
        documentId={documentId}
        currentUser={currentUser}
        onNameChange={handleNameChange}
      />
      <div className="main-container">
        <Editor 
          content={content}
          onChange={handleContentChange}
          onCursorChange={handleCursorChange}
          currentUser={currentUser}
        />
        <UserList users={users} currentUser={currentUser} />
      </div>
    </div>
  );
}

export default App;
