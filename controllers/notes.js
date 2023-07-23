import { client } from "../database/connect.js";

const db = client.db("my-notes");
const notes = db.collection("notes");

export async function createNoteController(req, res) {
  const note = req.body

  try {
    await notes.insertOne(note);
    res.status(201).json({ message: "note created successfully" });
  } catch (error) {
    res.status(500).json({ message: "note creation failed" });
  }
}

export async function getAllNotesController(req, res) {
  res.status(200).json({ message: "get all notes" });
}
