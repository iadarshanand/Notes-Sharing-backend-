import { getUserData, loggedInUser, registerUser } from "./authController.js";
import { createNote, getAllNotes, getNoteById } from "./notesController.js";

export {
  registerUser,
  loggedInUser,
  getUserData,
  createNote,
  getAllNotes,
  getNoteById,
};
