import { User } from "@/db";
import { NextRequest, NextResponse } from "next/server";

// Set Budget for a specific category
export async function POST(req: NextRequest) {
  try {
    const { category, amount } = await req.json();

    if (!category || !amount) {
      return NextResponse.json(
        { error: "Missing category or amount" },
        { status: 400 }
      );
    }

    const validCategories = [
      "housing",
      "utilities",
      "food",
      "transportation",
      "healthMedical",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Upsert ensures a user document is created if none exists
    const updatedUser = await User.findOneAndUpdate(
      {},
      { $set: { [category]: parseFloat(amount) } },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      {
        message: "Budget updated successfully",
        budget: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating budget:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get the current budget document
export async function GET() {
  try {
    const user = await User.findOne({});
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }
    return NextResponse.json({ response: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json(
      { error: "Could not fetch budget" },
      { status: 500 }
    );
  }
}
