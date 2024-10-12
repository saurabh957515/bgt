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
router.post("/",protectRoute, createBank);
router.get("/",protectRoute, getBank);
router.get("/gettypes",protectRoute, getBankTypes);
router.delete("/:id",protectRoute, deleteBank);
router.patch("/:id", protectRoute,updateBank);
router.get("/filter", protectRoute,getByFilter);
export default router;
