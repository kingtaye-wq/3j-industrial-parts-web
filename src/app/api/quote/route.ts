import { NextResponse } from "next/server";
import { BRAND } from "@/data/catalog";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const referenceId = `3J-${Date.now().toString(36).toUpperCase()}`;

    // Bridge quote request into Platform Supabase / OS (<24h SLA)
    const platformUrl =
      process.env.PLATFORM_API_URL ||
      process.env.NEXT_PUBLIC_PLATFORM_URL ||
      "https://3j-industrial-parts-platform.vercel.app";

    try {
      await fetch(`${platformUrl}/api/bridge/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BRIDGE_SECRET_KEY || "3ji-internal-bridge-key"}`,
        },
        body: JSON.stringify({
          action: "create_quote",
          source_site: "foundry",
          division: "Division 01 — Foundry",
          company: body.company,
          name: body.name,
          email: body.email,
          phone: body.phone,
          platform: body.platform,
          serialNumber: body.serialNumber,
          urgency: body.urgency,
          message: body.message,
          referenceId,
        }),
      });
    } catch (bridgeErr) {
      console.warn("Platform bridge forward warning:", bridgeErr);
    }

    return NextResponse.json(
      {
        ok: true,
        referenceId,
        source_site: "foundry",
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
