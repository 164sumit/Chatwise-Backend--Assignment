# Chatwise Backend & Frontend Assignment
## Deployment Link
```bash
https://chatwise-backend-assignment-gamma.vercel.app/
```

## Project Setup

### Prerequisites
- Node.js installed (version 22.10.0 or later)
- npm or yarn installed

### Local Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/164sumit/Chatwise-Backend--Assignment.git
   cd Chatwise-Backend--Assignment
   ```

2. **Backend Configuration**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Create a `.env` file and add the following variables:
     ```
     SECRET_KEY=your_secret_key
     MONGODB_URI=your_mongodb_uri
     ```

3. **Frontend Configuration**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Update the backend URL in `src/lib/index.ts` to:
     ```typescript
     const backendUrl = "http://localhost:3001";
     ```

### Installing Dependencies

#### Backend
- Navigate to the `backend` directory:
  ```bash
  cd backend
  ```
- Install the dependencies:
  ```bash
  npm install
  ```

#### Frontend
- Navigate to the `frontend` directory:
  ```bash
  cd ../frontend
  ```
- Install the dependencies:
  ```bash
  npm install
  ```

### Compiling and Running

#### Backend
- Compile TypeScript to JavaScript:
  ```bash
  npm run build
  ```
- Start the backend server:
  ```bash
  npm start
  ```
  or for development mode:
  ```bash
  npm run dev
  ```

#### Frontend
- Start the frontend server:
  ```bash
  npm run dev
  ```

### Project Features

#### User Profile
- Users can view all their friends and friend requests sent by other users.

#### Add Feed
- Users can create a new feed.

### Assignment Specifications

For the assignment "Javascript: Insta/FB-like content feed for users", the operations (or APIs) needed are:

1. **Posts Retrieval**:
   - Retrieve posts created by the user's friends.
   - Retrieve posts from non-friends if a friend has commented on it.

2. **Endpoints**:
   - `GET /posts` - Retrieves posts created by the user's friends.
   - `GET /posts/comments` - Retrieves posts from non-friends if a friend has commented on it.
   - `POST /feed` - Creates a new feed.

3. **Additional Operations**:
   - Fetch friends list.
   - Fetch comments on posts.

---

### Backend Structure

- **Environment Variables**: `.env` file should contain the `SECRET_KEY` and `MONGODB_URI`.
- **Scripts**:
  - `npm install` - Installs dependencies.
  - `npm run build` - Compiles TypeScript files into JavaScript.
  - `npm start` - Runs the server.
  - `npm run dev` - Runs the server in development mode with auto-reload.

### Frontend Structure

- **Backend URL Configuration**: Set `backendUrl` in `src/lib/index.ts` to `http://localhost:3001`.
- **Scripts**:
  - `npm install` - Installs dependencies.
  - `npm run dev` - Starts the development server.

Feel free to modify the README as per your specific needs!
