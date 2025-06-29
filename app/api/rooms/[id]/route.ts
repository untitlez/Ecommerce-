import { NextRequest, NextResponse } from "next/server";

import { validateRoom } from "@/validators/room.validator";
import { listRoom, removeRoom, updateRoom } from "@/services/room.services";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const payload = await listRoom(id);
    return NextResponse.json(payload);
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = validateRoom(body);
    const payload = await updateRoom(id, parsed);
    return NextResponse.json({
      message: "Update successfully",
      data: payload,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await removeRoom(id);
    return NextResponse.json({
      message: "Delete successfully",
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
