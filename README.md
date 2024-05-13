# Todo-with-backend-using-React

This is a full-stack todo application built using Express.js for the backend and React.js for the frontend. It allows users to sign up, log in, create todos, and manage their todo list.

## Features

- **User Authentication**: Users can sign up and log in securely using JWT tokens.
- **Create Todos**: Users can create new todos with titles and descriptions.
- **View Todos**: Users can view all their todos in a list format.
- **Toggle Todo Status**: Users can mark todos as completed or incomplete.
- **Responsive Design**: The frontend is designed to work well on both desktop and mobile devices.

## Technologies Used

- **Backend**: Express.js, MongoDB with Mongoose
- **Frontend**: React.js
- **Authentication**: JSON Web Tokens (JWT), Zod
- **Styling**: CSS

## Usage

### Backend

The backend is built using Express.js and MongoDB with Mongoose. It provides RESTful API endpoints for user authentication and todo management.

- **Authentication Routes**:
  - `POST /new-user`: Creates a new user.
  - `POST /login`: Authenticates a user and returns a JWT token.
- **Todo Routes**:
  - `POST /new-todo`: Creates a new todo.
  - `GET /todos`: Retrieves all todos for a user.
  - `PUT /todo/:uuid/:trueorfalse`: Toggles the completion status of a todo.

### Frontend

The frontend is built using React.js. It communicates with the backend API to provide a user-friendly interface for managing todos.

- **Signup/Login Component**: Allows users to sign up or log in.
- **User Content Component**: Displays the user's todos and provides functionality to create new todos.
- **All Todos Component**: Renders all todos retrieved from the backend.
- **Todo Component**: Renders individual todo items.
## Installation

1. Clone the repository:

git clone https://github.com/RishitUmeshPadagatti/Todo-with-backend-using-React

2. Install dependencies for both backend and frontend:

cd todo-app/backend
npm install

cd ../frontend
npm install

3. Configure backend:

Replace the placeholder values in 'config.js' with your actual configuration.

4. Run the application:

npm run dev
