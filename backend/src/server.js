// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import teamRoutes from "./routes/teamRoutes.js"; // استدعاء ملف الراوتر

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8200;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*" // السماح للجميع بالوصول حالياً
}));
app.use(express.json());

// Routes
// رابط تجريبي للتأكد أن السيرفر يعمل
app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

// تفعيل روابط الفريق والمشاريع
// جميع الروابط ستبدأ بـ /api
// مثال: http://localhost:8200/api/members
app.use("/api", teamRoutes);

// تشغيل السيرفر
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));