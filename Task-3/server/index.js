const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store active documents and users
const documents = new Map();
const users = new Map();

// Document structure: { id, content, users: Set }

// Initialize default document
documents.set('default', {
  id: 'default',
  content: '// Welcome to Real-Time Collaboration Tool!\n// Start typing to collaborate with others in real-time.\n\n',
  users: new Set()
});

// Broadcast to all clients in a document
function broadcastToDocument(docId, data, excludeWs = null) {
  const doc = documents.get(docId);
  if (!doc) return;

  wss.clients.forEach(client => {
    if (client !== excludeWs && 
        client.readyState === WebSocket.OPEN && 
        client.documentId === docId) {
      client.send(JSON.stringify(data));
    }
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  const userId = uuidv4();
  ws.userId = userId;
  ws.documentId = 'default'; // Default document
  
  console.log(`New connection: ${userId}`);

  // Add user to the document
  const doc = documents.get(ws.documentId);
  if (doc) {
    doc.users.add(userId);
  }

  // Store user info
  users.set(userId, {
    id: userId,
    name: `User-${userId.substring(0, 6)}`,
    color: generateColor(),
    cursorPosition: 0
  });

  // Send initial data to the new user
  ws.send(JSON.stringify({
    type: 'init',
    userId: userId,
    content: doc.content,
    users: Array.from(doc.users).map(id => users.get(id))
  }));

  // Notify others about the new user
  broadcastToDocument(ws.documentId, {
    type: 'user-joined',
    user: users.get(userId)
  }, ws);

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch(data.type) {
        case 'content-change':
          handleContentChange(ws, data);
          break;
        
        case 'cursor-position':
          handleCursorPosition(ws, data);
          break;
        
        case 'user-info':
          handleUserInfo(ws, data);
          break;

        case 'change-document':
          handleDocumentChange(ws, data);
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Handle disconnection
  ws.on('close', () => {
    console.log(`Connection closed: ${userId}`);
    
    const doc = documents.get(ws.documentId);
    if (doc) {
      doc.users.delete(userId);
    }
    
    users.delete(userId);
    
    broadcastToDocument(ws.documentId, {
      type: 'user-left',
      userId: userId
    });
  });
});

// Handle content changes
function handleContentChange(ws, data) {
  const doc = documents.get(ws.documentId);
  if (!doc) return;

  // Update document content
  doc.content = data.content;

  // Broadcast to all other users in the document
  broadcastToDocument(ws.documentId, {
    type: 'content-update',
    content: data.content,
    userId: ws.userId,
    timestamp: Date.now()
  }, ws);
}

// Handle cursor position updates
function handleCursorPosition(ws, data) {
  const user = users.get(ws.userId);
  if (!user) return;

  user.cursorPosition = data.position;

  broadcastToDocument(ws.documentId, {
    type: 'cursor-update',
    userId: ws.userId,
    position: data.position
  }, ws);
}

// Handle user info updates
function handleUserInfo(ws, data) {
  const user = users.get(ws.userId);
  if (!user) return;

  if (data.name) user.name = data.name;
  
  broadcastToDocument(ws.documentId, {
    type: 'user-info-update',
    user: user
  }, ws);
}

// Handle document switching
function handleDocumentChange(ws, data) {
  const oldDocId = ws.documentId;
  const newDocId = data.documentId;

  // Remove user from old document
  const oldDoc = documents.get(oldDocId);
  if (oldDoc) {
    oldDoc.users.delete(ws.userId);
  }

  // Notify old document users
  broadcastToDocument(oldDocId, {
    type: 'user-left',
    userId: ws.userId
  });

  // Create new document if it doesn't exist
  if (!documents.has(newDocId)) {
    documents.set(newDocId, {
      id: newDocId,
      content: '// New Document\n\n',
      users: new Set()
    });
  }

  // Add user to new document
  const newDoc = documents.get(newDocId);
  newDoc.users.add(ws.userId);
  ws.documentId = newDocId;

  // Send new document content
  ws.send(JSON.stringify({
    type: 'document-changed',
    content: newDoc.content,
    users: Array.from(newDoc.users).map(id => users.get(id))
  }));

  // Notify new document users
  broadcastToDocument(newDocId, {
    type: 'user-joined',
    user: users.get(ws.userId)
  }, ws);
}

// Generate random color for user
function generateColor() {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// REST API endpoints
app.get('/api/documents', (req, res) => {
  const docList = Array.from(documents.entries()).map(([id, doc]) => ({
    id,
    userCount: doc.users.size
  }));
  res.json(docList);
});

app.post('/api/documents', (req, res) => {
  const docId = req.body.id || uuidv4();
  
  if (!documents.has(docId)) {
    documents.set(docId, {
      id: docId,
      content: req.body.content || '// New Document\n\n',
      users: new Set()
    });
  }
  
  res.json({ id: docId });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`WebSocket server ready for connections`);
});
