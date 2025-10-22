import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8200;

app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

app.get("/api/members", (req, res) => {
  res.json([
    { name: "Jana", role: "Frontend Developer" },
    { name: "Rana", role: "Backend Developer" },
    { name: "Manar", role: "UI/UX Designer" },
    { name: "Shatha", role: "Project Manager" }
  ]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
