import { Router } from "express";
import {
  createNoteController,
  getAllNotesController,
  getSingleNoteController,
} from "../controllers/notes.js";

const router = Router();

router.route("/").post(createNoteController).get(getAllNotesController);

router
  .route("/:id")
  .get(getSingleNoteController)
  .patch((req, res) => res.status(200).json({ message: "update single note" }))
  .delete((req, res) =>
    res.status(200).json({ message: "delete single note" })
  );

export default router;
