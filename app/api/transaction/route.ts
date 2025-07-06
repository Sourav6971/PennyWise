import { NextResponse } from "next/server";

import { Data } from "@/db";

export async function GET() {
  try {
    const transactions = await Data.find().sort({ updatedAt: -1 });

    return NextResponse.json({
      success: true,
      response: transactions,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch transactions." },
      { status: 500 }
    );
  }
}
