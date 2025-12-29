import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { location, maxPrice } = req.query;

    console.log("Search Params Received:", { location, maxPrice }); // DEBUGGING LOG

    try {
        let filter = {};

        // 1. CHECK LOCATION
        // If your database uses "city", keep this. 
        // If your database uses "location", change it to: filter.location = location;
        if (location) {
            filter.city = location;
        }

        // 2. CHECK PRICE (Crucial Step)
        // I changed 'price' to 'pricePerNight' based on your script.js file
        if (maxPrice) {
            filter.pricePerNight = { $lte: Number(maxPrice) };
        }

        const hotels = await Hotel.find(filter);
        console.log("Hotels Found:", hotels.length); // DEBUGGING LOG

        res.json(hotels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;