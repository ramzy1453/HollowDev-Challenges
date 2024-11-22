import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: "Hello, World!", body });
}
