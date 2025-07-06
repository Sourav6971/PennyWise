import mongoose from "mongoose";

import "dotenv/config";
const MONGO_URL = process.env.MONGO_URL || "";

mongoose.connect(MONGO_URL).then(() => console.log("Connected to DB"));

const dataSchema = new mongoose.Schema(
  {
    amount: String,
    description: String,
    category: String,
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  housing: { type: Number, default: 0 },
  utilities: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  transportation: { type: Number, default: 0 },
  healthMedical: { type: Number, default: 0 },
});

export const Data = mongoose.models.Data || mongoose.model("Data", dataSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
