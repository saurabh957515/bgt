import express from "express";
import path from "path";
import { getFileById } from "../controllers/Files.controller.js";
const router = express.Router();
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fileRecord = await getFileById(id);
    if (!fileRecord) {
      return res.status(404).send({ message: "File not found" });
    }

    const filePath = path.resolve(fileRecord[0].file_path);
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send({ message: "Error displaying file" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
});

export default router;
