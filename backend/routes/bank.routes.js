import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createBank,
  deleteBank,
  getBank,
  updateBank,
  getByFilter,
  getBankTypes,
} from "../controllers/BankController.js";
const router = express.Router();
router.post("/", createBank);
router.get("/", getBank);
router.get("/gettypes", getBankTypes);
router.delete("/:id", deleteBank);
router.patch("/:id", updateBank);
router.get("/filter", getByFilter);
export default router;
