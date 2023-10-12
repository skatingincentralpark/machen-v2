import "server-only";
import { NOTES_DATA } from "@/lib/data";

export function GET() {
  const JSON_NOTES_DATA = JSON.stringify(NOTES_DATA);

  return new Response(JSON_NOTES_DATA, { status: 200 });
}
