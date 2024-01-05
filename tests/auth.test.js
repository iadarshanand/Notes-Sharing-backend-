import supertest from "supertest";
import "dotenv/config";
import mongoose from "mongoose";
import app from "../index.js";
import {
  SetUserId,
  getAuthToken,
  getNoteId,
  getUserName,
  setAuthToken,
  setNoteId,
  setUserName,
} from "./setup.js";
import { generateRandomUsername } from "../helper/randomGenerator.js";

const request = supertest(app);

describe("Authentication API", () => {
  beforeAll(async () => {
    // Set up any necessary environment for testing (e.g., database setup)
    await mongoose.connect(process.env.MONGODB_URL);
  });

  afterAll(async () => {
    // Clean up any resources used for testing (e.g., database teardown)
    await mongoose.connection.close();
  });

  describe("POST /register", () => {
    it("should register a new user with valid data", async () => {
      const username = generateRandomUsername(6);
      setUserName(`t${username}`);

      const res = await request
        .post("/api/auth/signup")
        .send({ username: `t${username}`, password: "testpassword" });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("User registered successfully");
      expect(res.body.user._id).toBeDefined();
      expect(res.body.user.username).toBe(`t${username}`);
    });

    it("should return an error for invalid username during registration", async () => {
      const res = await request
        .post("/api/auth/signup")
        .send({ username: "", password: "test" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('"username" is not allowed to be empty');
    });

    it("should return an error for empty password during registration", async () => {
      const res = await request
        .post("/api/auth/signup")
        .send({ username: "test", password: "" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('"password" is not allowed to be empty');
    });

    it("should return an error for duplicate username during registration", async () => {
      const res = await request
        .post("/api/auth/signup")
        .send({ username: `${await getUserName()}`, password: "testpassword" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Username is already taken");
    });
  });

  //Login Test
  describe("POST /login", () => {
    it("should log in a user with valid credentials", async () => {
      // Assuming you have registered the user before testing
      await request
        .post("/api/auth/signup")
        .send({ username: "testuser", password: "testpassword" });

      const res = await request
        .post("/api/auth/login")
        .send({ username: "testuser", password: "testpassword" });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("User login successfully");
      expect(res.body.user._id).toBeDefined();
      expect(res.body.user.username).toBe("testuser");
      expect(res.body.token).toBeDefined();
      // Save the token using the setup function

      setAuthToken(res.body.token);
      SetUserId(res.body.user._id);
    });

    it("should return an error for invalid credentials during login", async () => {
      const res = await request
        .post("/api/auth/login")
        .send({ username: "nonexistentuser", password: "invalidpassword" });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid credentials");
    });

    it("should return an error for missing username during login", async () => {
      const res = await request
        .post("/api/auth/login")
        .send({ password: "testpassword" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('"username" is required');
    });

    it("should return an error for missing password during login", async () => {
      const res = await request
        .post("/api/auth/login")
        .send({ username: "testuser" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('"password" is required');
    });
  });

  //Note Test
  describe("POST /create-note", () => {
    it("should create a new note with valid data", async () => {
      const requestBody = {
        title: "Test Note",
        content: "This is a test note",
      };

      const token = await getAuthToken();

      const response = await request
        .post("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .send(requestBody);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe("Note created successfully");
      setNoteId(response.body.note._id);
    });

    it("should return an error for missing token", async () => {
      const requestBody = {
        title: "Test Note",
        content: "This is a test note",
      };

      const response = await request.post("/api/notes").send(requestBody);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized - No token provided");
    });
  });

  describe("GET / notes", () => {
    it("should get all notes for authenticated user", async () => {
      const token = await getAuthToken();

      const response = await request
        .get("/api/notes")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe(
        "Fetched all notes for authenticated User"
      );
    });

    it("should return an error for missing token in creating note", async () => {
      const response = await request.get("/api/notes");
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized - No token provided");
    });

    it("should return a note with given id for authenticated user", async () => {
      const noteId = await getNoteId();

      const response = await request
        .get(`/api/notes/${noteId}`)
        .set("Authorization", `Bearer ${await getAuthToken()}`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe(
        "Note with given Id fetched successfully"
      );
    });

    it("should return an updated note with given id for authenticated user", async () => {
      const noteId = await getNoteId();
      const requestBody = {
        title: "Test Note",
        content: "This is a test note",
      };
      const response = await request
        .put(`/api/notes/${noteId}`)
        .send(requestBody)
        .set("Authorization", `Bearer ${await getAuthToken()}`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe("Note updated successfully");
    });

    it("should return a deleted note with given id for authenticated user", async () => {
      const noteId = await getNoteId();

      const response = await request
        .delete(`/api/notes/${noteId}`)
        .set("Authorization", `Bearer ${await getAuthToken()}`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe("Note deleted successfully");
    });
  });

  //Shared Note
  describe("POST /api/notes/:id/share", () => {
    it("should share a note with another user", async () => {
      // Create a note to be shared
      const response = await request
        .post("/api/notes")
        .send({
          title: "Test Note",
          content: "This is a test note for sharing.",
        })
        .set("Authorization", `Bearer ${await getAuthToken()}`);

      const noteId = response.body.note._id;

      // Create another user to share the note with

      const userResponse = await request.post("/api/auth/signup").send({
        username: `o${await generateRandomUsername(6)}`,
        password: "password",
      });
      const otherUserId = userResponse.body.user._id;

      // Share the note with the other user
      const shareResponse = await request
        .post(`/api/notes/${noteId}/share`)
        .set("Authorization", `Bearer ${await getAuthToken()}`) // Use the authToken of the note sharer to validate authenticated user
        .send({ sharedUserId: otherUserId });

      expect(shareResponse.status).toBe(200);
      expect(shareResponse.body.status).toBe(true);
      expect(shareResponse.body.message).toBe("Note shared successfully");
    });
  });

  // Search Notes
  describe("GET /api/search?q=:query", () => {
    it("should search notes based on keywords", async () => {
      // Create a note to be searched
      const createNoteResponse = await request
        .post("/api/notes")
        .send({
          title: "Test Note",
          content: "This is a test note for searching.",
        })
        .set("Authorization", `Bearer ${await getAuthToken()}`);

      // Search for notes based on keywords
      const searchResponse = await request
        .get(`/api/search?q=test`)
        .set("Authorization", `Bearer ${await getAuthToken()}`);

      expect(searchResponse.status).toBe(200);
      expect(searchResponse.body.notes).toBeInstanceOf(Array);
      expect(searchResponse.body.notes.length).toBeGreaterThan(0);
    });
  });
});
