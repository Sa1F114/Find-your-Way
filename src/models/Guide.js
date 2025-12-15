// JavaScript source code
// src/models/Guide.js

import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
    name: String,
    location: String,
    pricePerDay: Number,
    experience: Number,
    contact: String
});

export default mongoose.model("Guide", guideSchema);

