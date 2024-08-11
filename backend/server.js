import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageeditroutes from "./routes/messageedit.routes.js";
import sql from "./db/queryExecution.js";
const app = express();
dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/message", messageeditroutes);
app.use("/getStates", (req, res) => {
  console.log("i am running");
  res.send("hello i am comming");
});
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.use("/getuser", (req, res) => {
  console.log("got it");
  res.send("hello i am comming");
});

app.listen(PORT, async () => {
  await sql("SELECT 1", [], (callback) => {
    if (callback?.err) {
      console.error("Error executing query:", err);
    } else {
      console.log("Connected To Database", callback);
    }
  });
  console.log(`Server Running on port ${PORT}`);
});
