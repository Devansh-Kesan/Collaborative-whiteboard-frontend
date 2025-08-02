# Real-Time Collaborative Whiteboard

This is a powerful, real-time collaborative whiteboard platform that enables multiple users to draw, design, and interact simultaneously with sub-second latency. Built with a modern full-stack architecture, this application provides a seamless shared visual workspace for remote teams, educators, and creative professionals.

[Live Demo Link](https://your-deployed-project-link.com) *(Replace with your deployed project link)*

## ✨ Key Features

- **Real-Time Multi-User Collaboration**: Draw, erase, and modify content simultaneously with other users. All actions are synchronized instantly across all connected clients.
- **Rich Drawing Toolkit**:
  - Tools: Line, Rectangle, Circle, Arrow, Brush, and Text input.
  - Libraries: Utilizes [RoughJS](https://roughjs.com/) for a hand-drawn look and [Perfect-Freehand](https://github.com/steveruizok/perfect-freehand) for a smooth brush tool.
- **Full Session Control**: Includes essential Undo/Redo functionality and an option to Download the whiteboard as an image.
- **Secure User Sessions**: Implements JWT (JSON Web Token) authentication to protect API endpoints and ensure that whiteboard sessions are secure and private.
- **Persistent Storage**: Whiteboard states are automatically saved to a MongoDB database, allowing users to return to their work later.

## 🛠️ Technical Implementation Highlights

This project demonstrates a strong understanding of full-stack development and real-time communication protocols.

- **Real-Time Communication**: Leverages [Socket.IO](https://socket.io/) to implement a bidirectional, event-based communication channel between the clients and the server. This ensures that all drawing actions are propagated to connected users with minimal latency.
- **Secure API Architecture**: The backend, built with Node.js and Express, features a secure REST API. Endpoints are protected using JWT authentication middleware, preventing unauthorized access to whiteboard data.
- **Efficient Data Persistence**: Utilizes a MongoDB NoSQL database to efficiently store and retrieve complex whiteboard session data, including all drawn paths and elements.
- **Advanced Canvas Tools**: Implements third-party libraries like RoughJS and Perfect-Freehand to provide a superior drawing experience beyond the standard HTML Canvas capabilities.

## 🚀 Technology Stack

### Frontend:
- [React](https://reactjs.org/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [RoughJS](https://roughjs.com/)
- [Perfect-Freehand](https://github.com/steveruizok/perfect-freehand)

### Backend:
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [JSON Web Token (JWT)](https://jwt.io/)

## 🔧 Installation and Setup

This project uses a separate repository for the frontend and backend. Follow these steps to run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- A running MongoDB instance (either local or on a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Project Repositories
- **Frontend Repository**: [Link to your frontend repo](https://github.com/your-username/your-frontend-repo) *(Replace with your frontend repo link)*
- **Backend Repository**: [Link to your backend repo](https://github.com/your-username/your-backend-repo) *(Replace with your backend repo link)*

### 1. Clone the Repositories

```bash
# Clone the frontend repository
git clone https://github.com/your-username/your-frontend-repo.git

# Clone the backend repository
git clone https://github.com/your-username/your-backend-repo.git
```

### 2. Backend Setup

First, set up and run the backend server.

```bash
# Navigate to the backend project directory
cd your-backend-repo

# Install dependencies
npm install
```

Next, create a `.env` file in the root of the `/backend` directory. It should contain the following variables:

```env
# Your secret key for signing JWTs
SECRET_KEY=my_super_secret_key

# Your MongoDB Atlas credentials
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password

# The port for the backend server
PORT=5000
```

**Note**: Your application code should use these variables to construct the MongoDB connection string. You may also need to add your MongoDB cluster URL to the `.env` file or hardcode it if it's not already in your connection logic.

```bash
# Start the backend development server
npm run dev
```

The backend server will now be running on `http://localhost:5000`.

### 3. Frontend Setup

In a new terminal window, set up and run the frontend client.

```bash
# Navigate to the frontend project directory
cd your-frontend-repo

# Install dependencies
npm install

# Start the frontend development server
npm start
```

### 4. Access the Application

The frontend will now be running. Open your browser and navigate to `http://localhost:3000` to use the whiteboard. The frontend will connect to the backend server running on port 5000.

**A quick note on CORS**: Ensure your backend Express server is configured with the CORS middleware to accept requests from `http://localhost:3000`.