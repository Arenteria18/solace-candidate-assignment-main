import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  // Sanitize response to remove PII (e.g., phoneNumber) and prevent caching
  const raw = advocateData;
  const data = raw.map(({ phoneNumber, ...rest }) => rest);

  return Response.json(
    { data },
    {
      headers: {
  "Cache-Control": "no-store",
  Pragma: "no-cache",
  Expires: "0",
  Vary: "Authorization",
  "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
