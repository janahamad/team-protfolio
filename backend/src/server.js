
import express from "express";
import logger from "./middleware/logger.js";
import cors from "cors";
import dotenv from "dotenv";
import teamRoutes from "./routes/teamRoutes.js";

// ********* START SWAGGER IMPORTS *********
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// ********* END SWAGGER IMPORTS *********

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8200;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.use(express.json());
app.use(logger);

// ********* SWAGGER CONFIGURATION *********
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Team Management API",
      version: "1.0.0",
      description: "توثيق شامل لنقاط نهاية API لإدارة الفريق والمشاريع.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`, // المسار الأساسي لكل الروابط
      },
    ],
  },
  // تحديد المسار الذي سيبحث فيه عن تعليقات JSDoc
  apis: ["./routes/*.js"], // سيجد ملف teamRoutes.js
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ********* END SWAGGER CONFIGURATION *********


// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

app.use("/api", teamRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));