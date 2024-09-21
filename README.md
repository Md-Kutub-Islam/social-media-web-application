
# College Connect - Social Media Web Application

Overview

College Connect is a social media platform specifically designed for college students. The platform allows students to create and update their accounts, share posts, connect with fellow students, and showcase their skills and achievements. Users can also add friends, interact with posts through likes, and manage their profiles seamlessly.

This project is built using the MERN stack (MongoDB, Express.js, React, and Node.js), providing a modern, scalable, and robust web application. For security, JWT (JSON Web Token) is used for user authentication, and passwords are encrypted using Bcrypt to ensure data safety.


## Features

- User Account Management:
    Users can create an account, update their profile, and delete their account. User profiles allow for sharing educational streams, skills, and personal achievements.

- Post Management:
    Users can create, update, and delete their posts, allowing them to share thoughts, achievements, and updates with others in the network.

- Friend System:
    Users can add other students as friends and remove them if needed, creating personal connections.

- Post Interactions:
    Users can like posts shared by others, encouraging interactions between peers.

- Authentication and Security:
    JWT Tokens: Secure authentication to manage user sessions.
- Bcrypt: Used for password encryption to ensure user data is secure.

## Tech Stack

- Frontend: React.js with MaterialUI (for building the user interface)
- Backend: Node.js with Express.js (for handling server-side logic)
- Database: MongoDB (for storing user information, posts, and friendships)
- Authentication: JWT (for token-based authentication)
- Security: Bcrypt (for encrypting user passwords)


## Demo

https://social-media-cf4k.onrender.com/


## Installation

Install my-project with npm

Make sure you have the following installed:

- Node.js
- MongoDB or use MongoDB atlas

Setup

1.  Clone the repository:
```bash
  git clone https://github.com/Md-Kutub-Islam/social-media-web-application.git
  cd social-media
```
2. Install dependencies for both frontend and backend:
```bash
  # Install backend dependencies
  cd server
  npm install

# Install frontend dependencies
  cd ../client
  npm install
```

3. Set up environment variables:
Create a .env file in the server directory and add the following:
```bash
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-jwt-secret
  PORT=you-server-port
  FRONTEND_URL= your-frontend-url
```
Create a .env file in the client directory and add the following:
```bash
  server_URL= your-frontend-url
```
4. Run the application:
```bash
  # Start the backend server
  cd server
  npm start

  # Start the frontend server
  cd ../client
  npm run dev
```
## Usage

1. Sign Up: Users can create an account by providing their details such as name, email, stream, skills, and password.
2. Login: Secure login using JWT authentication.
3. Profile: Users can update their personal information, including their educational stream and achievements.
4. Create Post: Users can create posts to share updates, achievements, and more.
5. Like & Comment: Interact with posts by liking them.
Friendship: Add or remove friends to stay connected with fellow college students.



## security

- JWT Authentication is used to ensure secure login sessions. Tokens are validated on every request to protected routes.
- Password Encryption is handled with Bcrypt to protect user passwords from being stored as plain text.
## Future Enhancements

- Implement real-time chat for friend connections.
- Add comment functionality for posts.
- Enable post search/filter based on user streams and skills.
- Notifications for friend requests and post interactions.
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Contributing

Feel free to submit issues or pull requests if you'd like to contribute to this project!


## License

This project is licensed under the MIT License - see the LICENSE file for details.

