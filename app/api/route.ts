import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { Data } from "../db";

const dataSchema = z.object({
  amount: z.string().trim(),
  description: z.string().trim(),
  category: z.string().trim(),
});

export async function GET() {
  try {
    const response = await Data.find({});
    return NextResponse.json({ response }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Could not fetch data" }, { status: 500 });
  }
}

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
  const { id, amount, category, description } = await req.json();
  try {
    const response = await Data.findOne({ _id: id });
    if (!response) {
      return NextResponse.json({ msg: "Data does not exist" }, { status: 404 });
    }
    await Data.updateOne({
      id: id,

      $set: {
        amount,
        category,
        description,
        date: Date.now,
      },
    });
    return NextResponse.json({ msg: "Data updated!" }, { status: 200 });
  } catch {
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
