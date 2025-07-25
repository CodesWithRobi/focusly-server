# 📑 Focusly App - Backend Documentation
## Desciiption

Focusly is a modern video-based productivity platform designed for seamless real-time collaboration, inspired by Google Meet but built for teams, students, and communities who want a minimalist yet powerful communication experience.


## 🚀 Key Features

🎥 Live Video & Audio Communication (via WebRTC + PeerJS)
🤝 Real-time multi-user room collaboration (Socket.IO)
🧠 Focus Timer & Productivity Tools (Pomodoro mode)
👥 User presence tracking & typing indicators
📋 Task sharing, notes, and session history
📱 Responsive Design – Works on desktop & mobile

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **Socket.IO**
- **PeerJS**
- **CORS**

---

## 📁 Project Structure

focusly-backend/
├── models/
│   ├── User.js
│   └── Room.js
├── routes/
│   └── roomRoutes.js
├── socket/
│   └── index.js
├── .env
├── server.js
├── package.json
└── README.md

---
## 🔁 API & Socket Events

### REST Endpoint (Peer Server)

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/peerjs`        | Handles PeerJS connections           |
---
### 📡 Socket.IO Events

| Event Name         | Data Sent              | Description                                   |
|--------------------|------------------------|-----------------------------------------------|
| `join-room`        | `{ roomId, userId }`   | Join a specific room                          |
| `user-connected`   | `userId`               | Emitted to other users when someone joins     |
| `user-disconnected`| `userId`               | Emitted when a user disconnects               |
---

## 💡Use Cases

- Study groups working together virtually
- Remote teams with daily stand-ups
- Co-working sessions with productivity tracking
- Minimal virtual classrooms for teachers
---
## 🧑‍💻 Credits / Acknowledgments

Shout out to open source libraries, tutorials, or people who helped.

---
## ✅ Summary

This backend handles:

- **Live Peer-to-Peer video connection** via **PeerJS**
- **Real-time user presence & communication** via **Socket.IO**
- Easy integration with your **React (Vite) frontend**
---