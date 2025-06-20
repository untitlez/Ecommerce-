import {
  listProfile,
  removeProfile,
  updateProfile,
} from "@/services/usersProfile.services";
import { userProfileSchema } from "@/validators/userProfileSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await listProfile(params.id);
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
    const body = await req.json();
    const parsed = userProfileSchema.safeParse(body);
    const payload = await updateProfile(params.id, parsed.data);

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
    await removeProfile(params.id);
    return NextResponse.json({
      message: "Delete successfully",
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
