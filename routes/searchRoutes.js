import express from "express";
import { keywordNotes } from "../controllers/shareController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const searchRouter = express.Router();

searchRouter.get("/", isAuthenticated, keywordNotes);

export default searchRouter;
