// JavaScript source code

// src/routes/guide.routes.js
import express from "express";
import Guide from "../models/Guide.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { location, minPrice, maxPrice } = req.query;
    const filter = {};

    if (location) filter.location = location;
    if (minPrice || maxPrice)
        filter.pricePerDay = { $gte: minPrice || 0, $lte: maxPrice || 99999 };

    res.json(await Guide.find(filter));
});

export default router;

