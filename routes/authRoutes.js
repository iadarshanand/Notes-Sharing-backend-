import express from "express";
import {
  getUserData,
  loggedInUser,
  registerUser,
} from "../controllers/index.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { sharedNote } from "../controllers/notesController.js";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", loggedInUser);
authRouter.get("/get-loggedinUser", isAuthenticated, getUserData);

export default authRouter;
