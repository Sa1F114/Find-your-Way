import express from 'express';
import Guide from '../models/Guide.js';

const router = express.Router();

// GET: Fetch guides based on Location, Price, and Experience
router.get('/', async (req, res) => {
    // 1. Grab the parameters sent from the frontend
    const { location, maxPrice, experience } = req.query;

    console.log("-----------------------------------------");
    console.log("SEARCHING GUIDES WITH:");
    console.log("Location:", location);
    console.log("Max Price:", maxPrice);
    console.log("Min Experience:", experience);

    try {
        let filter = {};

        // === FIX 1: Use 'location' (matches your database) ===
        if (location) {
            filter.location = location;
        }

        // === FIX 2: Use 'pricePerDay' (matches your database) ===
        if (maxPrice) {
            // $lte = Less Than or Equal to (e.g., <= 3000)
            filter.pricePerDay = { $lte: Number(maxPrice) };
        }

        // === FIX 3: Use 'experience' (matches your database) ===
        if (experience) {
            // $gte = Greater Than or Equal to (e.g., >= 5 years)
            filter.experience = { $gte: Number(experience) };
        }

        console.log("Constructed Filter:", filter); // Check this in your VS Code terminal

        const guides = await Guide.find(filter);

        console.log(`Found ${guides.length} guides matching criteria.`);
        console.log("-----------------------------------------");

        res.json(guides);
    } catch (err) {
        console.error("Guide Fetch Error:", err);
        res.status(500).json({ error: 'Server error while fetching guides' });
    }
});

export default router;