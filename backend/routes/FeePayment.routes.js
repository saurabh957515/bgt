import express from "express";
import {
  createFeePayment,
  deleteFeePayment,
  getByFilter,
  getFeePaymentDetails,
  updateFeePayment,
} from "../controllers/FeePayment.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.post("/", createFeePayment);
router.get("/", getFeePaymentDetails);
router.delete("/:id", deleteFeePayment);
router.patch("/:id", updateFeePayment);
router.get("/filter", getByFilter);
export default router;
