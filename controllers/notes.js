import { ObjectId } from "mongodb";
import { client } from "../database/connect.js";

const db = client.db("my-notes");
const notes = db.collection("notes");

export async function createNoteController(req, res) {
  const note = req.body;

  try {
    await notes.insertOne(note);
    res.status(201).json({ message: "note created successfully" });
  } catch (error) {
    res.status(500).json({ message: "note creation failed" });
  }
}

export async function getAllNotesController(req, res) {
  try {
    const all_notes = await notes.find().toArray();
    res.status(200).json(all_notes);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
}

export async function getSingleNoteController(req, res) {
  const { id } = req.params;

  try {
    const note = await notes.findOne({ _id: new ObjectId(id) });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
}

export async function updateSingleNote(req, res) {
  const { id } = req.params;
  const { title, note } = req.body;

  console.log({ title, note });

  const updatedNote = {
    $set: { title, note },
  };

  try {
    await notes.updateOne({ _id: new ObjectId(id) }, updatedNote);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
}

export async function deleteSingleNote(req, res) {
  const { id } = req.params;

  try {
    await notes.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "deleted a single note" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
}
