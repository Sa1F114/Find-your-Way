

import express from 'express';
import Guide from '../models/Guide.js'; // Assuming you're using mongoose models

const router = express.Router();

// GET: Fetch guides based on location (e.g., 'Bandarban')
router.get('/', async (req, res) => {
    const { location } = req.query; // Get location from query parameter

    try {
        const guides = await Guide.find({ location }); // Filter guides by location
        res.json(guides); // Send filtered guides as response
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching guides' });
    }
});

export default router;
