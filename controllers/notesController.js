import mongoose from "mongoose";
import { Note } from "../models/index.js";
import { validateNote } from "../validators/index.js";

//create Note
export const createNote = async (req, res) => {
  try {
    //validate noteSchema from req.body
    const { error } = validateNote(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { title, content } = req.body;
    const note = await Note({ title, content, author: req.user.userId }).save();

    res.status(200).json({
      status: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get List of all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).populate("author", "id username");
    return res.status(200).json({
      status: true,
      message: "Fetched all notes for authenticated User",
      totalNotes: notes.length,
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get note by Id
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Note ID format",
      });
    }

    const note = await Note.findById(id).populate("author", "id username");
    if (!note)
      return res.status(400).json({
        message: "Note with given Id doesn't exist",
      });

    //otherwise
    return res.status(200).json({
      status: true,
      message: "Note with given Id fetched successfully",
      note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Update Note(only be update by author)
export const updateNote = async (req, res) => {
  try {
    //validate noteSchema from req.body
    const { error } = validateNote(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { id } = req.params;
    const { title, content } = req.body;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Note ID format",
      });
    }

    //check the user is author or not of this note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        message: "Note with the given ID doesn't exist",
      });
    }

    if (note.author._id != req.user.userId)
      return res
        .status(400)
        .json({ message: "Unauthorized--> User is not author of note" });

    //update the note
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note with the given ID doesn't exist",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete Note(only be deleted by author)
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Note ID format",
      });
    }

    //check the user is author or not of this note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        message: "Note with the given ID doesn't exist",
      });
    }
    if (note.author._id != req.user.userId)
      return res
        .status(400)
        .json({ message: "Unauthorized--> User is not author of note" });

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deleteNote)
      res.status(400).json({ message: "Note with the given ID doesn't exist" });

    res.status(200).json({
      status: true,
      message: "Note deleted successfully",
      deletedNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Share note
export const sharedNote = async (req, res) => {
  try {
    const { sharedUserId } = req.body;
    const { id } = req.params;

    // Check if the shared user id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sharedUserId)) {
      return res.status(400).json({
        message: "Invalid User ID format",
      });
    }
    // Check if the noteis a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Note ID format",
      });
    }

    //Note could be share by any authenticated user
    const note = await Note.findById(id);
    if (!note) return res.status(400).json({ message: "Note not found" });

    //push inside array if element not already exist
    if (!note.sharedWith.includes(sharedUserId)) {
      note.sharedWith.push(sharedUserId);
      await note.save();
    }

    res
      .status(200)
      .json({ status: true, message: "Note shared successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
