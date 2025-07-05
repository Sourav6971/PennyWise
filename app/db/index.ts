import mongoose from "mongoose";

import "dotenv/config";
const MONGO_URL = process.env.MONGO_URL || "";

mongoose.connect(MONGO_URL).then(() => console.log("Connected to DB"));

const dataSchema = new mongoose.Schema({
  amount: String,
  Date: { type: Date, default: Date.now },
  description: String,
  category: String,
});

export const Data = mongoose.models.Data || mongoose.model("Data", dataSchema);
