import { Note } from "../models/index.js";

export const keywordNotes = async (req, res) => {
  try {
    const { q } = req.query;
    const notes = await Note.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
      owner: req.user.id,
    });

    res.status(200).json({
      status: true,
      message: "Notes list based on keyword fetched successfully",
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
