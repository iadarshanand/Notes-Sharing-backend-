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
|   |-- authRoutes.js
|   |-- noteRoutes.js
|   |-- searchRoutes.js
|-- controllers/
|   |-- authController.js
|   |-- notesController.js
|   |-- searchController.js  
|-- helper
|   |-- authHelper.js 
|-- middleware/
|   |-- authMiddleware.js
|-- models/
|   |-- User.js
|   |-- Note.js
|-- tests/
|   |-- test.js
|-- .env
|-- db.js
|-- package.json
|-- README.md


## Setup Instructions

1. Clone the repository:

   bash
   git clone https://github.com/your-username/notes-api.git
   

2. Install dependencies:

   bash
   npm install
   

3. Create a `.env` file and set your environment variables:

   plaintext
   PORT=3000
   JWT_SECRET=your_secret_key_here
   

4. Start the server:

   bash
   npm start
   

5. Run tests:

   bash
   npm test
   

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

## Evaluation Criteria

The code will be evaluated on the following criteria:

1. **Correctness:** Does the code meet the requirements and work as expected?
2. **Performance:** Does the code use rate limiting and request throttling to handle high traffic?
3. **Security:** Does the code implement secure authentication and authorization mechanisms?
4. **Quality:** Is the code well-organized, maintainable, and easy to understand?
5. **Completeness:** Does the code include unit, integration, and end-to-end tests for all endpoints?
6. **Search Functionality:** Does the code implement text indexing and search functionality to enable users to search for notes based on keywords?

Feel free to reach out if you have any questions or need further assistance.