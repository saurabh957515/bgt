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
router.post("/",protectRoute, createFeePayment);
router.get("/",protectRoute, getFeePaymentDetails);
router.delete("/:id",protectRoute, deleteFeePayment);
router.patch("/:id",protectRoute, updateFeePayment);
router.get("/filter", protectRoute,getByFilter);
export default router;
