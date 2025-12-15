// JavaScript source code
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import guideRoutes from "./routes/guide.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/admin", adminRoutes);

export default app;

