import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Guide from "./models/Guide.js";
import Hotel from "./models/Hotel.js";

dotenv.config();

// correct file paths for your setup
const guides = JSON.parse(fs.readFileSync("./src/data/guides.json", "utf-8"));
const hotels = JSON.parse(fs.readFileSync("./src/data/hotels.json", "utf-8"));

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        //await Guide.deleteMany();
        //await Hotel.deleteMany();

        await Guide.insertMany(guides);
        await Hotel.insertMany(hotels);

        console.log("🎉 Sample data imported successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Error importing data:", error.message);
        process.exit(1);
    }
};

seedData();
