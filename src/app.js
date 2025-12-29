import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import guideRoutes from "./routes/guide.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));  // Static file serving

// API Routes
app.use("/api/guides", guideRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/admin", adminRoutes);

export default app;


