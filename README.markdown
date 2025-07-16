# Task Management Application

A full-stack MERN application for managing tasks with a responsive UI, RESTful API, and MongoDB integration. Includes JWT authentication for user-specific task management.

## Features

- Create, read, update, delete (CRUD) tasks
- Filter tasks by status (pending/completed)
- Responsive UI with Tailwind CSS
- RESTful API with error handling
- MongoDB with Mongoose for data storage
- JWT-based authentication
- API documentation included

## Project Structure

```
task-management-app/
├── backend/
│   ├── models/
│   │   ├── Task.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── tasks.js
│   │   ├── auth.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskPage.jsx
│   │   │   ├── Login.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
├── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Setup Instructions

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task-management-app/backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with:

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskdb?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd task-management-app/frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with:

   ```
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:

   ```bash
   npm run dev
   ```

## API Documentation

### Base URL

`http://localhost:5000`

### Authentication Routes

- **POST /api/auth/register**
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`
- **POST /api/auth/login**
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`

### Task Routes

- **POST /api/tasks**
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "string", "description": "string" }`
  - Response: `{ "task": { "_id": "string", "title": "string", "description": "string", "status": "pending", "createdAt": "timestamp", "user": "string" } }`
- **GET /api/tasks**
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "tasks": [{ "_id": "string", ... }] }`
- **GET /api/tasks/:id**
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "task": { "_id": "string", ... } }`
- **PUT /api/tasks/:id**
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "string", "description": "string", "status": "pending|completed" }`
  - Response: `{ "task": { "_id": "string", ... } }`
- **DELETE /api/tasks/:id**
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "message": "Task deleted" }`

## Demo

Screenshots and a demo video can be recorded to show:

- Login/Register functionality
- Task creation, editing, deletion
- Task status toggling