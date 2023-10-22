import "server-only";
import { DUMMY_NOTES_DATA } from "@/lib/data";

export function GET() {
  const JSON_NOTES_DATA = JSON.stringify(DUMMY_NOTES_DATA);

  return new Response(JSON_NOTES_DATA, { status: 200 });
}
