import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import admissionRoutes from './routes/admission.routes.js'
import messageRoutes from "./routes/message.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import educationRoutes from "./routes/Education.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageeditroutes from "./routes/messageedit.routes.js";
const app = express();
dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/message", messageeditroutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, async () => {
  console.log(`Server Running on port ${PORT}`);
});
