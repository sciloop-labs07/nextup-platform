import { listReview } from "@/lib/store";

export async function GET(request: Request) {
  if (process.env.ADMIN_REVIEW_KEY && request.headers.get("x-admin-key") !== process.env.ADMIN_REVIEW_KEY) return Response.json({ error: "Admin authorization required" }, { status: 401 });
  return Response.json({ data: await listReview() });
}
