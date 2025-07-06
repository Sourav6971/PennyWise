import { Data } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const dataSchema = z.object({
  amount: z.string().trim(),
  description: z.string().trim(),
  category: z.string().trim(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = dataSchema.safeParse(body);
  if (!response.success) {
    return NextResponse.json(
      {
        msg: "Invalid formats",
      },
      { status: 403 }
    );
  }
  const { amount, description, category } = response.data;
  try {
    await Data.create({
      amount,
      description,
      category,
    });
    return NextResponse.json(
      {
        msg: "Data added successfully",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        msg: "Error adding to database",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, amount, category, description } = await req.json();

    const updated = await Data.findByIdAndUpdate(
      id,
      {
        amount,
        category,
        description,
        date: Date.now(),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ msg: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "Data updated!", updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ msg: "Could not update data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    const response = await Data.findOne({ _id: id });
    if (!response) {
      return NextResponse.json({ msg: "Data does not exist" }, { status: 404 });
    }
    await Data.deleteOne({ _id: id });
    return NextResponse.json(
      {
        msg: "Data deleted succesfully",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { msg: "Error deleting the data!" },
      { status: 500 }
    );
  }
}
