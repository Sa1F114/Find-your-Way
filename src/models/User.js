// JavaScript source code

// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bookmarks: {
        guides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guide" }],
        hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }]
    }
});

export default mongoose.model("User", userSchema);

