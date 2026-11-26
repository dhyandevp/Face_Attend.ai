import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/product";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";

// Simple in-memory rate limiter per IP
const ipHits = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.expiresAt) {
    ipHits.set(ip, { count: 1, expiresAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute." },
        { status: 429 },
      );
    }

    const json = await request.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid form submission." },
        { status: 400 },
      );
    }

    try {
      await db.insert(contactSubmissions).values({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      });
    } catch (dbErr) {
      console.warn("[API Contact] Database insert skipped (local/demo mode):", dbErr);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[API Contact] Uncaught error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
