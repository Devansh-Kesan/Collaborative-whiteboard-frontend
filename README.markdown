# 🧼 Real-Time Collaborative Whiteboard

A powerful real-time collaborative whiteboard platform that enables multiple users to draw, design, and interact with sub-second latency. Ideal for remote teams, educators, and creative professionals, this app offers a seamless shared visual workspace backed by a robust full-stack architecture.

🔗 [Live Demo](https://your-deployed-project-link.com) *(Update with your deployed project URL)*

## ✨ Key Features

- **Real-Time Multi-User Collaboration**  
  Draw, erase, and modify content simultaneously across connected clients using [Socket.IO](https://socket.io/) for instant synchronization.

- **Rich Drawing Toolkit**  
  - **Tools**: Line, Rectangle, Circle, Arrow, Brush, Eraser, and Text  
  - **Libraries**: [RoughJS](https://roughjs.com/) for hand-drawn aesthetics, [Perfect-Freehand](https://github.com/steveruizok/perfect-freehand) for smooth brush strokes  

- **Session Management**  
  - Undo/Redo functionality  
  - Download whiteboard as an image  
  - Persistent state storage via MongoDB  
  - Secure whiteboard sessions using JWT authentication  

## 🛠️ Technical Highlights

- **Real-Time Communication**  
  Uses [Socket.IO](https://socket.io/) for fast, bidirectional, event-based communication.  

- **Secure Backend Architecture**  
  REST API built with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), protected via JWT-based authentication middleware.  

- **Efficient Data Persistence**  
  [MongoDB](https://www.mongodb.com/) stores complete whiteboard session data, including all drawn paths and metadata.  

- **Advanced Drawing Capabilities**  
  Leverages [RoughJS](https://roughjs.com/) and [Perfect-Freehand](https://github.com/steveruizok/perfect-freehand) to offer a premium drawing experience beyond the native HTML canvas.  

## 🚀 Tech Stack

### Frontend
- [React](https://reactjs.org/)  
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)  
- [RoughJS](https://roughjs.com/)  
- [Perfect-Freehand](https://github.com/steveruizok/perfect-freehand)  

### Backend
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/)  
- [Socket.IO](https://socket.io/)  
- [JWT Authentication](https://jwt.io/)  

## 🔧 Installation & Setup

**Note**: This project uses separate repositories for the frontend and backend.

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  

### 📁 Project Repositories
- **Frontend Repo**: [Link to your frontend repo](https://github.com/your-username/your-frontend-repo) *(Update with your frontend repo link)*  
- **Backend Repo**: [Link to your backend repo](https://github.com/your-username/your-backend-repo) *(Update with your backend repo link)*  

### 🛠 Backend Setup

```bash
# Clone backend
git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo

# Install dependencies
npm install
```

Create a `.env` file in the backend root with the following:

```env
SECRET_KEY=your_jwt_secret
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
PORT=5000
```

Ensure your code constructs the MongoDB URI using these environment variables.

```bash
# Start backend
npm run dev
```

Server runs at: `http://localhost:5000`

### 🖥 Frontend Setup

```bash
# Clone frontend
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo

# Install dependencies
npm install

# Start frontend
npm start
```

App runs at: `http://localhost:3000`

**Note**: Make sure your backend has CORS enabled to accept requests from `http://localhost:3000`.