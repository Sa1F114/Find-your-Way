// JavaScript source code

// src/routes/hotel.routes.js
import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { city, minPrice, maxPrice } = req.query;
    const filter = {};

    if (city) filter.city = city;
    if (minPrice || maxPrice)
        filter.pricePerNight = { $gte: minPrice || 0, $lte: maxPrice || 99999 };

    res.json(await Hotel.find(filter));
});

export default router;

