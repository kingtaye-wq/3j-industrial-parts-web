import { NextResponse } from "next/server";
import { BRAND } from "@/data/catalog";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const referenceId = `3J-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        ok: true,
        referenceId,
        recipient: BRAND.email,
        phone: BRAND.phoneDisplay,
        slaPromise: "Estimate within 24 hours",
        submittedAt: new Date().toISOString(),
        payload: body,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid request payload",
      },
      { status: 400 }
    );
  }
}
