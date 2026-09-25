import { listPublished } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await listPublished({ q: searchParams.get("q") ?? undefined, category: searchParams.get("category") ?? undefined, format: searchParams.get("format") ?? undefined });
  return Response.json({ data });
}
