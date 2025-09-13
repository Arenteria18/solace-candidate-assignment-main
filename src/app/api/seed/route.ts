import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { headers } from "next/headers";

export async function POST() {
  try {
    // Gate by environment and optional token
    const isDev = process.env.NODE_ENV !== "production";
    const seedEnabled = process.env.SEED_ENABLED === "true";

    if (!isDev && !seedEnabled) {
      return new Response("Seeding disabled", { status: 403 });
    }

    if (!isDev) {
      // In non-dev, require a token to mitigate misuse
      const expected = process.env.SEED_TOKEN;
      const provided = headers().get("x-seed-token");
      if (!expected || provided !== expected) {
        return new Response("Unauthorized", { status: 401 });
      }
    }

    const records = await db.insert(advocates).values(advocateData).returning();
    return Response.json({ advocates: records });
  } catch (err) {
    console.error("Seed error:", err);
    return new Response("Seed failed", { status: 500 });
  }
}
