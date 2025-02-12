# Full-Stack Application

## Overview
This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application provides a seamless user experience with a responsive frontend and a robust backend. It features user authentication, CRUD operations, and a secure API to manage data efficiently.

## Implementation
### Backend
- Built with Node.js and Express.js.
- Uses MongoDB as the database, connected via Mongoose.
- Implements JWT-based authentication for user login and authorization.
- Uses middleware for request validation and error handling.
- RESTful API with routes for users and data management.

### Frontend
- Developed using React and styled with Tailwind CSS.
- Uses React Router for client-side navigation.
- Fetches data from the backend API using Axios.
- Implements Redux for state management (if applicable).

## API Workflow
1. **User Authentication**
   - Users register and log in via JWT authentication.
   - Protected routes ensure only authenticated users access certain data.

2. **Data Management**
   - Users can perform CRUD operations via API endpoints.
   - MongoDB stores structured user and application data.

3. **Error Handling & Security**
   - Middleware handles errors and invalid requests.
   - Secure API with validation to prevent unauthorized access.

## API Endpoints
Method

Endpoint

Description

POST

/api/auth/register

Register a new user

POST

/api/login

User login and token generation

/api/reset-password

Reset user password

POST

/api/reset-password-request

Request password reset

GET

/api/user

Fetch authenticated user info (protected)


## Deployment
- Frontend deployed using Netlify.
- Backend hosted on Render with environment variables configured.



