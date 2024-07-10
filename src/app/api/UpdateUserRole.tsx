import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, role } = await req.json();

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ success: false, error: "Failed to update user role" }, { status: 500 });
  }
}

