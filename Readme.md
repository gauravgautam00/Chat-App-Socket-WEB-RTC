# Real-Time Chat Application

This is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.IO for real-time communication. The application allows users to engage in real-time messaging with other users and supports features such as user authentication, message history, and dynamic updates.

## Features

- **Real-Time Messaging:** Utilizes Socket.IO to enable real-time messaging between users.
- **User Authentication:** Users can register and log in securely to access the chat application.
- **Message History:** Displays the history of messages exchanged between users within a conversation.
- **Dynamic Updates:** Messages are dynamically updated in the chat window without the need for manual refresh.

## Technologies Used

- **Frontend:**

  - React.js
  - Socket.IO Client

- **Backend:**

  - Node.js
  - Express.js
  - Socket.IO Server

- **Database:**
  - MongoDB

## How to Run

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd real-time-chat-application`

### Server:

1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Client:

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the client: `npm start`

The server will run on `http://localhost:8880` and the client will run on `http://localhost:3000`. Make sure both the server and client are running simultaneously for the application to work correctly.
