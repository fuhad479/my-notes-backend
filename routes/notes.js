import { Router } from "express";
import {
  createNoteController,
  getAllNotesController,
  getSingleNoteController,
  updateSingleNote
} from "../controllers/notes.js";

const router = Router();

router.route("/").post(createNoteController).get(getAllNotesController);

router
  .route("/:id")
  .get(getSingleNoteController)
  .patch(updateSingleNote)
  .delete((req, res) =>
    res.status(200).json({ message: "delete single note" })
  );

export default router;
