import express from "express";
import { createNote, getAllNotes, getNoteById } from "../controllers/index.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  deleteNote,
  sharedNote,
  updateNote,
} from "../controllers/notesController.js";

const noteRouter = express.Router();

noteRouter.post("/", isAuthenticated, createNote);
noteRouter.get("/", isAuthenticated, getAllNotes);
noteRouter.get("/:id", isAuthenticated, getNoteById);
noteRouter.put("/:id", isAuthenticated, updateNote);
noteRouter.delete("/:id", isAuthenticated, deleteNote);
noteRouter.post("/:id/share", sharedNote);

export default noteRouter;
