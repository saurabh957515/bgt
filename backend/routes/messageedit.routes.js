import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import Message from "../models/message.model.js";

const router = express.Router();

router.get("/chat/:id", protectRoute, async (req, res) => {
  console.log("outside console");
  try {
    const { id: messageID } = req.params;
    console.log("hello ", messageID);
    const filterMessages = await Message.findOneAndDelete({ _id: messageID });

    res.status(200).json(filterMessages);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
