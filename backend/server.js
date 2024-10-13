import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import admissionRoutes from "./routes/admission.routes.js";
import universityRoutes from "./routes/University.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import feePaymentRoutes from "./routes/FeePayment.routes.js";
import bankRoutes from "./routes/bank.routes.js";
import educationRoutes from "./routes/Education.routes.js";
import fileRoutes from "./routes/file.routes.js";
import protectRoute from "./middleware/protectRoute.js";
import whatsappRoutes from "./routes/whatsappRoutes.js"
const app = express();
dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "backend", "views"));

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use(express.static(path.join(__dirname, "backend", "public")));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/feepayment", feePaymentRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/file", fileRoutes);
app.get("*", protectRoute, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.get("/api/check-auth", protectRoute, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});
app.listen(PORT, async () => {
  console.log(`Server Running on port ${PORT}`);
});
