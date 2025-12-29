
import express from "express";
import Guide from "../models/Guide.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// anyone can add
router.post("/guide", async (req, res) => {
    res.json(await Guide.create(req.body));
});

router.post("/hotel", async (req, res) => {
    res.json(await Hotel.create(req.body));
});

router.delete("/guide/:id", async (req, res) => {
    await Guide.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

router.delete("/hotel/:id", async (req, res) => {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
