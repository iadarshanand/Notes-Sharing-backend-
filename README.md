# Notes API

This project implements a secure and scalable RESTful API for managing notes. Users can create, read, update, delete notes, share notes with other users, and search for notes based on keywords.

## Tech Stack

- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing notes and user data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: Authentication mechanism for securing API endpoints.
- **JEST and SUPERTEST**: Testing libraries for writing and executing tests.
- **Helmet**: Middleware for securing Express.js applications by setting various HTTP headers.
- **Express Rate Limit**: Middleware for handling rate limiting and request throttling.

## Project Structure

The project is structured as follows:

project-root/
|-- index.js
|-- routes/
| |-- authRoutes.js
| |-- noteRoutes.js
| |-- searchRoutes.js
|-- controllers/
| |-- authController.js
| |-- notesController.js
| |-- searchController.js  
|-- helper
| |-- authHelper.js
|-- middleware/
| |-- authMiddleware.js
|-- models/
| |-- User.js
| |-- Note.js
|-- tests/
| |-- test.js
|-- .env
|-- db.js
|-- package.json
|-- README.md

## Setup Instructions

1. Clone the repository:

   bash
   git clone https://github.com/iadarshanand/Notes-Sharing-backend-.git

2. Install dependencies:

   bash
   npm install

3. Create a `.env` file and set your environment variables:

   PORT=8000
   MONGODB_URL=mongodb+srv://iadarshanand:Adarsh2022@cluster0.ytcwm.mongodb.net/noteSharing
   JWT_SECRET=secret

4. Start the server:

   bash
   npm start

5. Run tests:

   bash
   npm test

## Result of test

![Request Example](https://res.cloudinary.com/dsibd3mda/image/upload/v1704396754/Screenshot_2024-01-05_010209_qftsui.png)

## API Endpoints

- **Authentication Endpoints:**

  - `POST /api/auth/signup`: Create a new user account.
  - `POST /api/auth/login`: Log in to an existing user account and receive an access token.

- **Note Endpoints:**

  - `GET /api/notes`: Get a list of all notes for the authenticated user.
  - `GET /api/notes/:id`: Get a note by ID for the authenticated user.
  - `POST /api/notes`: Create a new note for the authenticated user.
  - `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
  - `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
  - `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.

- **Search Functionality:**
  - `GET /api/search?q=:query`: Search for notes based on keywords for the authenticated user.

## API Documentation

Explore the [Postman Documentation](https://www.postman.com/martian-trinity-976711/workspace/notes-sharing-backend) for detailed API information.

![Request Example](https://res.cloudinary.com/dsibd3mda/image/upload/v1704396473/Screenshot_2024-01-05_005517_lghnpt.png)
