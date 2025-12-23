# 🚀 Real-Time Collaboration Tool

A fully functional collaborative platform for coding and note-taking with multi-user support using WebSocket for real-time updates.

## ✨ Features

- **Real-time Collaboration**: Multiple users can edit the same document simultaneously
- **WebSocket Communication**: Instant synchronization across all connected clients
- **User Presence**: See who's currently editing with colored indicators
- **Cursor Tracking**: View cursor positions of other users in real-time
- **User Customization**: Change your display name with inline editing
- **Clean UI**: VS Code-inspired dark theme with intuitive interface
- **Line Numbers**: Code editor-style line numbering
- **Multi-Document Support**: Backend supports multiple collaborative documents

## 🏗️ Architecture

### Backend (Node.js + Express + WebSocket)
- Express server handling HTTP requests
- WebSocket server for real-time bidirectional communication
- Document management with user tracking
- Broadcast system for propagating changes to all clients

### Frontend (React)
- Real-time collaborative text editor
- User presence sidebar showing active users
- Connection status indicator
- Responsive and modern UI

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Installation

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

## 🎯 Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:3001`

### Start the Frontend Application

In a new terminal:

```bash
cd client
npm start
```

The React app will open automatically at `http://localhost:3000`

## 🎮 Usage

1. **Open the application** in your browser at `http://localhost:3000`
2. **Connection**: The app automatically connects to the WebSocket server
3. **Start typing**: Begin editing in the main text area
4. **Multi-user**: Open the app in multiple browser tabs/windows to see real-time collaboration
5. **Change your name**: Click on your username in the header to edit it
6. **View active users**: Check the right sidebar to see all connected users

## 🔧 Configuration

### Server Port
Edit `server/index.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### WebSocket URL
Edit `client/src/App.js`:
```javascript
const ws = new WebSocket('ws://localhost:3001');
```

## 📁 Project Structure

```
three/
├── server/
│   ├── index.js          # WebSocket server & Express backend
│   └── package.json
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.js       # Collaborative text editor
│   │   │   ├── Editor.css
│   │   │   ├── UserList.js     # Active users sidebar
│   │   │   ├── UserList.css
│   │   │   ├── Header.js       # App header with status
│   │   │   └── Header.css
│   │   ├── App.js              # Main application component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── package.json
```

## 🌟 Key Features Explained

### Real-Time Synchronization
- Changes are broadcast instantly to all connected clients
- WebSocket ensures low-latency communication
- Optimistic updates for smooth user experience

### User Management
- Unique ID assigned to each connection
- Random color assignment for visual distinction
- Editable display names
- Join/leave notifications

### Document Management
- Default document available on connection
- Support for multiple documents (extensible)
- Content persistence during session

## 🔐 WebSocket Events

### Client → Server
- `content-change`: Send document updates
- `cursor-position`: Send cursor position updates
- `user-info`: Update user information
- `change-document`: Switch between documents

### Server → Client
- `init`: Initial connection data
- `content-update`: Document content changed
- `user-joined`: New user connected
- `user-left`: User disconnected
- `cursor-update`: User cursor moved
- `user-info-update`: User information changed

## 🎨 Customization

### Change Theme Colors
Edit the CSS files in `client/src/components/` to customize colors:
- Background: `#1e1e1e`
- Primary: `#667eea`
- Accent: `#764ba2`

### Add Syntax Highlighting
Integrate libraries like:
- CodeMirror
- Monaco Editor
- Prism.js

## 🐛 Troubleshooting

**Connection Failed**
- Ensure the backend server is running on port 3001
- Check firewall settings
- Verify WebSocket URL in `App.js`

**Changes Not Syncing**
- Check browser console for errors
- Verify WebSocket connection status (green indicator)
- Refresh the page to reconnect


## 📝 License

MIT License - Feel free to use this project for your internship or learning purposes!

**Technologies Used:**
- Node.js
- Express.js
- WebSocket (ws)
- React
- CSS3

---
