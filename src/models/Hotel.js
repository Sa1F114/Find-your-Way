// JavaScript source code

// src/models/Hotel.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: String,
    city: String,
    pricePerNight: Number,
    amenities: [String],
    contact: String
});

export default mongoose.model("Hotel", hotelSchema);

