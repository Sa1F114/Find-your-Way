
import express from 'express';
import Hotel from '../models/Hotel.js'; // Assuming you're using mongoose models

const router = express.Router();

// GET: Fetch hotels based on location (e.g., 'Cox's Bazar' or 'Bandarban')
router.get('/', async (req, res) => {
    const { location } = req.query; // Get location from query parameter

    try {
        const hotels = await Hotel.find({ city: location }); // Filter hotels by location
        res.json(hotels); // Send filtered hotels as response
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching hotels' });
    }
});

export default router;
