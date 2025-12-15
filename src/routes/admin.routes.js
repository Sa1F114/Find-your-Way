// JavaScript source code

// src/routes/admin.routes.js
import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";
import Guide from "../models/Guide.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();

router.use(auth, adminOnly);

router.post("/guide", async (req, res) => res.json(await Guide.create(req.body)));
router.post("/hotel", async (req, res) => res.json(await Hotel.create(req.body)));

router.delete("/guide/:id", async (req, res) => {
    await Guide.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

router.delete("/hotel/:id", async (req, res) => {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;

